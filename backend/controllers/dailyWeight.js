import { DailyWeight } from "../Model/DailyWeight.js";

export const getDailyWeight = async (req, res) => {
  try {
      const { userId } = req;
      const { date } = req.query;

      if (!date) res.status(400).json({
              status: "fail",
              message: "날짜가 필요합니다.",
          })

      const dailyWeight = await DailyWeight.findOne({user: userId, date});

      res.status(200).json({ status: "success", data: dailyWeight });
  } catch (error) {
      res.status(500).json({status: "fail",message: "서버 오류",});
  }
};

export const updateDailyWeight = async (req, res) => {
  try {
      const { userId } = req;
      const { date , weight } = req.body;
      console.log(date,weight)
      const dailyWeight = await DailyWeight.findOne({ user: userId, date });

      if (dailyWeight) {
          dailyWeight.weight = weight
          await dailyWeight.save();

          return res.status(200).json({
              status: "success",
              data: dailyWeight,
          });
      } else {
          const newDailyWeight = await DailyWeight.create({
              user: userId,
              weight,
              date,
          });

          return res.status(201).json({
              status: "success",
              data: newDailyWeight,
          });
      }
  } catch (error) {
      res.status(500).json({status: "fail",message: "서버 오류"});
  }
};