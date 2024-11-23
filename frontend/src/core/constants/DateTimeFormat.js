export const timeText = (feedDate, commentDate) => {
  const seconds = 1;
  const minute = seconds * 60;
  const hour = minute * 60;
  const day = hour * 24;

  let today = new Date();

  const timeDate = feedDate || commentDate;

  const timeAgo = Math.trunc((today.getTime() - timeDate.getTime()) / 1000);

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
    const year = timeDate.getFullYear();
    const month = timeDate.getMonth() + 1;
    const day = timeDate.getDate();
    timeAgoText = `${year}년 ${month}월 ${day}일`;
  }
  return timeAgoText;
};
