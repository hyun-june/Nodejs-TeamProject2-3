import { Feed } from "../Model/Feed.js";

export const getAllFeed = async (req, res) => {
  try {
    const feed = await Feed.find();
    res.status(200).json({ status: "success", data: feed });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "피드를 가져오는 데 오류가 발생했습니다.",
      error,
    });
  }
};

export const postFeed = async (req, res) => {
  try {
    const { fileUrl, description, hashtags, views, likes } = req.body;
    const { userId } = req;

    const newFeed = await Exercise.create({
      fileUrl,
      description,
      hashtags,
      views,
      likes,
      userId,
    });
    res.status(200).json({ status: "success", data: newFeed });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "피드를 추가하는 데 오류가 발생했습니다",
      error,
    });
  }
};

export const getFeed = async (req, res) => {
  try {
    const { id } = req.params;
    const feed = await Feed.findById(id);

    if (!feed) {
      throw new Error("해당 피드을 찾을 수 없습니다.");
    }
    res.status(200).json({ status: "success", data: feed });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error.message });
  }
};

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
    if (!feed) throw new Error("수정하려는 음식이 존재하지 않습니다.");
    res.status(200).json({ status: "success", data: feed });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error.message });
  }
};

export const deleteFeed = async (req, res) => {
  try {
    const { id } = req.params;
    const feed = await Feed.findByIdAndDelete(id);
    if (!feed) throw new Error("삭제할 피드가 없습니다");
    res.status(200).json({ status: "success", data: food });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

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

export const registerLike = async (req, res) => {
  const { id } = req.params;

  try {
    const feed = await Feed.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
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
