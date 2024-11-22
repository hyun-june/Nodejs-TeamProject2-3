export const timeText = (feedDate) => {
  const seconds = 1;
  const minute = seconds * 60;
  const hour = minute * 60;
  const day = hour * 24;

  let today = new Date();

  const timeAgo = Math.trunc((today.getTime() - feedDate.getTime()) / 1000);

  let timeAgoText = "";
  if (timeAgo < seconds * 10) {
    timeAgoText = "방금 전";
  } else if (timeAgo < minute) {
    timeAgoText = timeAgo + "초 전";
  } else if (timeAgo < hour) {
    timeAgoText = Math.trunc(timeAgo / minute) + "분 전";
  } else if (timeAgo < day) {
    timeAgoText = Math.trunc(timeAgo / hour) + "시간 전";
  } else if (timeAgo < day * 15) {
    timeAgoText = Math.trunc(timeAgo / day) + "일 전";
  } else {
    const year = feedDate.getFullYear();
    const month = feedDate.getMonth() + 1;
    const day = feedDate.getDate();
    timeAgoText = `${year}년 ${month}월 ${day}일`;
  }
  return timeAgoText;
};
