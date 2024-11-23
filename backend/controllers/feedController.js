import { Feed } from "../Model/Feed.js";
import { User } from "../Model/User.js";
import { UserDetail } from "../Model/UserDetail.js";

// 무한 스크롤 피드 데이터
export const getAllFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;
    const feed = await Feed.find().populate("userInfo").skip(skip).limit(limit);

    const totalFeeds = await Feed.countDocuments();
    const totalPages = Math.ceil(totalFeeds / limit);

    return res.status(200).json({
      status: "success",
      data: feed,
      page: page,
      limit: limit,
      total_pages: totalPages,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "피드를 가져오는 데 오류가 발생했습니다.",
      error,
    });
  }
};

export const getAllFeed2 = async (req, res) => {
  try {
    const { page, q, size, userId } = req.query;

    const cond = {};

    if (q) cond.description = { $regex: q, $options: "i" };

    if (userId) cond.user = userId;

    let query = Feed.find(cond).sort({ createdAt: -1 });
    let response = { status: "success" };

    if (page && size) {
      query.skip((page - 1) * size).limit(size);
      const totalItemNum = await Feed.countDocuments(cond);
      response.totalPageNum = Math.ceil(totalItemNum / size);
    }

    const feed = await query.exec();
    response.data = feed;

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "피드 데이터를 가져오는 데 오류가 발생했습니다.",
      error,
    });
  }
};

// 개별 피드를 가져옴 -> 디테일 페이지에 사용
export const getFeed = async (req, res) => {
  try {
    const { feedId } = req.params;
    const { userId } = req;

    const feed = await Feed.findById(feedId).populate({
      path: "user",
      populate: {
        path: "detailInfo",
        model: "UserDetail",
      },
    });
    console.log("fff", feed);
    const userInfo = await UserDetail.findOne({ user: userId });

    if (!feed) {
      throw new Error("해당 피드을 찾을 수 없습니다.");
    }

    const isLiked = feed.likedBy.includes(userId);

    return res.status(200).json({
      status: "success",
      data: { ...feed.toObject(), isLiked, userInfo },
    });
  } catch (error) {
    return res.status(404).json({ status: "fail", message: error.message });
  }
};

//피드를 새로 등록함
export const postFeed = async (req, res) => {
  try {
    const { description, hashtags, views, likes } = req.body;
    const { userId } = req;
    const fileUrl = req.file.path;
    const userDetail = await UserDetail.findOne({ user: userId });

    const newFeed = await Feed.create({
      fileUrl,
      description,
      hashtags,
      views,
      likes,
      user: userId,
      userInfo: userDetail._id,
    });

    return res.status(200).json({ status: "success", data: newFeed });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "피드를 추가하는 데 오류가 발생했습니다",
      error,
    });
  }
};

// 피드 검색
export const getSearchFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;
    const { q } = req.query;
    let search = {};

    if (q) {
      search = {
        $or: [
          { description: { $regex: q, $options: "i" } },
          { hashtags: { $elemMatch: { $regex: q, $options: "i" } } },
        ],
      };
    }
    const feedSearch = await Feed.find(search)
      .skip(skip)
      .limit(limit)
      .populate("userInfo");
    const totalFeedSearch = await Feed.countDocuments(search);
    // console.log("FFff", feedSearch);

    const totalSearchPages = Math.ceil(totalFeedSearch / limit);

    return res.status(200).json({
      status: "success",
      data: feedSearch,
      page,
      limit,
      total_pages: totalSearchPages,
    });
  } catch (error) {
    console.error("Error fetching feed:", error);
    return res.status(400).json({
      status: "fail",
      message: "피드 검색 실패",
    });
  }
};

// 피드를 수정함
export const updateFeed = async (req, res) => {
  try {
    const { id } = req.params;
    const { fileUrl, description, hashtags } = req.body;

    const feed = await Feed.findByIdAndUpdate(
      id,
      {
        fileUrl,
        description,
        hashtags,
      },
      { new: true }
    );
    if (!feed) throw new Error("수정하려는 피드가 존재하지 않습니다.");
    return res.status(200).json({ status: "success", data: feed });
  } catch (error) {
    return res.status(404).json({ status: "fail", message: error.message });
  }
};

//피드를 삭제함
export const deleteFeed = async (req, res) => {
  try {
    const { feedId } = req.params;

    const feed = await Feed.findByIdAndDelete(feedId);
    if (!feed) throw new Error("삭제할 피드가 없습니다");
    return res.status(200).json({ status: "success", data: feed });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

// 댓글을 추가함
export const updateComments = async (req, res) => {
  try {
    const { feedId } = req.params;
    const { userId } = req;
    const userDetail = await UserDetail.findOne({ user: userId });
    const contentText = req.body.content.content;
    const feed = await Feed.findById(feedId);

    const newComment = {
      userId: req.userId,
      content: contentText,
      createdAt: new Date(),
      userInfo: {
        nickname: userDetail.nickname,
        profileImg: userDetail.profileImg,
      },
    };

    feed.comments.push(newComment);
    const updatedFeed = await Feed.findById(feedId);
    await feed.save();
    return res.status(200).json({ status: "success", data: updatedFeed });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

//조회수를 1 늘려줌
export const registerView = async (req, res) => {
  const { id } = req.params;

  try {
    const feed = await Feed.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!feed) {
      throw new Error("피드를 찾을 수 없습니다");
    }
    return res.status(200).json({ status: "success", data: feed });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
};

// 좋아요
export const registerLike = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  try {
    const feed = await Feed.findById(id);
    if (!feed) {
      throw new Error("피드를 찾을 수 없습니다");
    }
    //이미 좋아요를 누른 사용자 확인
    if (feed.likedBy.includes(userId)) {
      throw new Error("이미 좋아요를 눌렀습니다.");
    }

    feed.likes += 1;
    feed.likedBy.push(userId);
    await feed.save();

    return res.status(200).json({ status: "success", data: feed });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
};

//좋아요 취소
export const registerUnlike = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  try {
    const feed = await Feed.findById(id);
    if (!feed) {
      throw new Error("피드를 찾을 수 없습니다.");
    }
    //좋아요를 누른 사용자 확인
    if (!feed.likedBy.includes(userId)) {
      throw new Error("좋아요 상태가 아닙니다.");
    }

    // 좋아요 취소
    feed.likes -= 1;
    feed.likedBy = feed.likedBy.filter((id) => id.toString() !== userId);
    await feed.save();

    return res.status(200).json({ status: "success", data: feed });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
};
