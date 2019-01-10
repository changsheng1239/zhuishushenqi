/**
 * 请预先安装axios，signale，async
 * 同级目录新建assets
 * 并发请自行修改
 */

const axios = require('axios')
const signale = require('signale')
const url = require('url')
const fs = require('fs')
const queue = require('async/queue')

const LIST_URL = 'https://api.tuwan.com/apps/Welfare/getMenuList?format=json&page=1'
const DETAIL_URL = 'https://api.tuwan.com/apps/Welfare/detail?format=json&id=1292&'
<<<<<<< HEAD
const re = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
=======
>>>>>>> d5d0520b34907d5fedfc0b65ccaca4c4e4889cc5


/**
 * 获取图片列表
 * @param {number} page 当前页
 */
async function getMenuList (page = 1) {
  try {
    const response = await axios.request({
      url: LIST_URL,
      method: 'GET',
      params: { page }
    })
    const data = response.data
    if (data.error !== 0) {
      return signale.error('发生了一个错误')
    }
    const listData = data.data
    return listData
  } catch (error) {
    throw new Error(error)
  }
}


/**
 * 获取图片详情
 * @param {any} id 图片id
 */
async function getDetail (id) {
  try {
    const response = await axios.request({
      url: DETAIL_URL,
      method: 'GET',
      params: { id }
    })
    const data = response.data
    if (data.error !== 0) {
      return signale.error('发生了一个错误')
    }
    return data
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * 保存远程文件zip文件到本地
 * @param {string} remoteUrl 远程文件地址
 * @param {string} name 文件名
 */
async function saveFile (remoteUrl, dir) {
  const response = await axios({
    method: 'GET',
    url: remoteUrl,
    responseType: 'stream'
  })
  response.data.pipe(fs.createWriteStream(dir))
<<<<<<< HEAD
    .on('close', () => signale.info('close'))
=======
    .on('close', () => signale.info(`${dir} 完成`))
>>>>>>> d5d0520b34907d5fedfc0b65ccaca4c4e4889cc5
    .on('error', error => signale.error(error))

}

function getBigPic (thumbUrl) {
  const imgPahtname = url.parse(thumbUrl).pathname.split('/')
  const b64 = imgPahtname[4]
  const imgArray = Buffer.from(b64, 'base64').toString().split(',')
  imgArray[1] = 1000
  imgArray[2] = 0
  const newImgArray = imgArray.join(',')
  const newB64 = Buffer.from(newImgArray).toString('base64')
  imgPahtname[4] = newB64
  const newPathname = imgPahtname.join('/')
  return `http://img4.tuwandata.com${newPathname}`
}

const q = queue(async function(task, callback) {
  await saveFile(task.img, task.name)
  callback()
<<<<<<< HEAD
}, 16)
=======
}, 8)
>>>>>>> d5d0520b34907d5fedfc0b65ccaca4c4e4889cc5

q.drain = function() {
  signale.info('all items have been processed')
}

async function start() {
  for (let page = 1; page <= 27; page++) {
    const listData = await getMenuList(page)
    listData.map(async img => {
      const detail = await getDetail(img.id)
      const thumb = detail.thumb
      const title = detail.title
<<<<<<< HEAD
      fs.stat(`./assets/${title}-${detail.id}`,function(err){
        if (err) {
          fs.mkdirSync(`./assets/${title}-${detail.id}`)
=======
      fs.stat(`/Users/xiadd/Dropbox/imgs/${title}-${detail.id}`,function(err){
        if (err) {
          fs.mkdirSync(`/Users/xiadd/Dropbox/imgs/${title}-${detail.id}`)
>>>>>>> d5d0520b34907d5fedfc0b65ccaca4c4e4889cc5
        }
      })
      
      thumb.forEach((img, index) => {
        const bigPicUrl = getBigPic(img)
        q.push({
<<<<<<< HEAD
          name: `./assets/${title}-${detail.id}/${index}.jpg`,
=======
          name: `/Users/xiadd/Dropbox/imgs/${title}-${detail.id}/${index}.jpg`,
>>>>>>> d5d0520b34907d5fedfc0b65ccaca4c4e4889cc5
          img:bigPicUrl
        }, () => {})
      })
    })
  }
}

// 执行代码
start()