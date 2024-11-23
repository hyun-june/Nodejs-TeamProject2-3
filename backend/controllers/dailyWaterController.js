import { DailyWater } from "../Model/DailyWater.js";

// 물 섭취량 조회
export const getWaterAmount = async (req, res) => {
  try {
    const { userId } = req;
    const { date } = req.query;

    if (!userId) {
      return res
        .status(400)
        .json({ status: "fail", message: "로그인이 필요합니다." });
    }

    if (!date) {
      return res
        .status(400)
        .json({ status: "fail", message: "날짜를 입력해주세요." });
    }

    const formattedDate = new Date(date).toISOString().split("T")[0]; // 날짜 포맷 통일

    const dailyWater = await DailyWater.findOne({
      user: userId,
      date: formattedDate,
    }).exec();

    if (!dailyWater) {
      return res.status(404).json({
        status: "fail",
        message: "해당 날짜의 기록이 없습니다.",
      });
    }

    res.status(200).json({
      status: "success",
      data: dailyWater,
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      status: "fail",
      message: "물 섭취 기록을 조회하는 중 오류가 발생했습니다.",
    });
  }
};

// 물 섭취량 수정
export const updateWaterAmount = async (req, res) => {
  try {
    const { userId } = req; // 사용자 ID
    const { date } = req.query;
    const { changeAmount } = req.body; // 요청 본문에서 날짜를 전달

    if (!userId) {
      return res
        .status(400)
        .json({ status: "fail", message: "로그인이 필요합니다." });
    }

    if (changeAmount === undefined) {
      return res.status(400).json({
        status: "fail",
        message: "날짜와 변경할 양을 입력해주세요.",
      });
    }

    const formattedDate = new Date(date).toISOString().split("T")[0];

    // DB에서 해당 날짜의 기록 조회 또는 새로 생성
    const dailyWater = await DailyWater.findOneAndUpdate(
      { user: userId, date: formattedDate },
      { $inc: { amount: changeAmount } }, // amount 값을 증가/감소
      { new: true, upsert: true, setDefaultsOnInsert: true } // 없으면 생성, 기본값 설정
    );

    // 섭취량이 음수가 되지 않도록 수정
    if (dailyWater.amount < 0) {
      dailyWater.amount = 0;
      await dailyWater.save();
    }

    res.status(200).json({
      status: "success",
      data: dailyWater,
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      status: "fail",
      message: "물 섭취량을 업데이트하는 중 오류가 발생했습니다.",
    });
  }
};
