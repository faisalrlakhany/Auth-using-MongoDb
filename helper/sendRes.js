export default function sendRes(res, status, msg, data , error)
{
  res.status(status).json({
    error ,
    msg , 
    data: data ,
  });
}