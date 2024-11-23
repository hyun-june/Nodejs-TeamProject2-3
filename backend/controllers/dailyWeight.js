import { DailyWeight } from "../Model/DailyWeight.js";

export const getDailyWeight = async (req, res) => {
    try {
    //   const { q, date } = req.query;
    //   const search = {};
  
    //   if (q) {
    //     search.name = { $regex: q, $options: "i" };
    //   }
  
    //   const food = await Food.find(search);
  
    //   if (food.length === 0) {
    //     return res.status(404).json({
    //       status: "fail",
    //       message: "검색결과가 없습니다.",
    //     });
    //   }



        
        res.status(200).json({ status: "success", data });
    } catch (error) {
      console.error("Error fetching food:", error);
      res.status(500).json({
        status: "fail",
        message: "서버 오류",
      });
    }
};


export const updateDailyWeight = async (req, res) => {
    try {

        
        res.status(200).json({ status: "success", data });
    } catch (error) {
      console.error("Error fetching food:", error);
      res.status(500).json({
        status: "fail",
        message: "서버 오류",
      });
    }
};
