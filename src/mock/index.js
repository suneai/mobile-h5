const delay = require('mocker-api/utils/delay');
const mockjs = require('mockjs');
const data = {
    'GET /api/user': {
        id: 1,
        username: 'kenny',
        sex: 6
    },
    'GET /api/hi': (req, res) => {
        res.json(
            {
                id: 1,
                //query 方法获取Get参数,如 /api/hi?name=tony
                username: req.query["name"],
            }
        )
    },
    //可以直接使用mockjs生成mock数据
    'GET /api/mock': mockjs.mock({
        'list|10-100': 1,
    })
}
//使用delay方法可以延迟返回数据
module.exports = delay(data, 1000);