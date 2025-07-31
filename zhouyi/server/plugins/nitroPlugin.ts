import path from "node:path"
import fs from "node:fs"
import { log } from "node:console"
import { fileURLToPath } from "node:url"
import { resolve } from "node:path"

export default defineNitroPlugin(nitroApp => {
//   console.log("nitroApp")
//   // console.log(dirs);

//   //获取当前文件路径
//   // const __dirname = process.cwd()
//   // const __dirname = fileURLToPath(import.meta.url)
//   const __dirname = path.resolve(fileURLToPath(import.meta.url), "../../../")

//   log("dir13", __dirname)
//   //拼接路径
//   const dir = path.resolve(__dirname, "server/modules")


//   log("dir13", dir)
 
//   //递归遍历路径下的所有文件
//   function traverseDir(dir: string) {
//     //遍历路径下的所有文件
//     const files = fs.readdirSync(dir)
//     for (const file of files) {
//       //获取文件的绝对路径
//       const filePath = path.join(dir, file)
//       const stat = fs.statSync(filePath)

//       // console.log(path.dirname(filePath));
//       // console.log(111);
//       // console.log(path.basename(filePath));

//       // if (stat.isFile() && path.dirname(filePath) === dir) {
//       //   log("dir25", parts)
//       // }
//       if (stat.isDirectory()) {
//         if (path.basename(filePath) === "api") {
//           const apiFiles = fs.readdirSync(filePath)
//           const parentFiles = path.basename(path.resolve(filePath, ".."))
//           log("dir25", path.resolve(filePath, ".."))
//           for (const apiFile of apiFiles) {
//             const parts = path.basename(apiFile, ".ts").split(".")
//             console.log(222)
//             const fullFilePath = path.join(filePath, apiFile)
//             // 将文件路径转换为 file:// 格式的 URL
//             const fileUrl = new URL(`file://${fullFilePath.replace(/\\/g, "/")}`)
            
//             import(fullFilePath)
//               .then(module => {
//                 const handler = module.default
//                 nitroApp.router.add(`/${parentFiles}/${parts[0]}`, module.default, parts[1])
//                 log("dir26", parts)
//               })
//               .catch(error => {
//                 console.error(`导入模块 ${fullFilePath} 时出错:`, error)
//               })
//           }
//         } else {
//           //递归遍历子目录
//           traverseDir(filePath)
//         }
//       }
//     }
//   }
//   traverseDir(dir)

  // 调用加载路由的函数
})
