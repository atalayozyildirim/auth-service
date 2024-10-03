"use strict";
// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
// import jwt from "jsonwebtoken";
// import { verify_token_jwt } from "../../util/JWT";
// const prisma = new PrismaClient();
// const GetUserData = async (req: Request, res: Response) => {
//   try {
//     const userId: any = req.headers["authorization"];
//     if (!userId) {
//       return res.status(401).json({
//         status: "401",
//         message: "Invalid token",
//       });
//     }
//     const token = userId.split(" ")[1];
//     const verify = verify_token_jwt(token);
//     if (!verify) {
//       return res.status(401).json({
//         status: "401",
//         message: "Invalid token",
//       });
//     }
//     const Decodetoken: any = jwt.decode(token);
//     const user = await prisma.user.findFirstOrThrow({
//       where: { id: parseInt(Decodetoken?.id) },
//     });
//     return res.status(200).json({
//       data: user,
//       status: "200",
//     });
//   } catch (err) {
//     return res.status(500).send({
//       status: "500",
//       message: "Expired token or invalid token",
//     });
//   }
// };
// const UpdateUser = async (req: Request, res: Response) => {
//   try {
//     const userId: any = req.headers["authorization"]?.split(" ")[1];
//     const verify = verify_token_jwt(userId);
//     if (!verify) {
//       return res.status(401).json({
//         status: "401",
//         message: "Invalid token",
//       });
//     }
//     const Decodetoken: any = jwt.decode(userId);
//     const { name, email, phoneNumber } = req.body;
//     if (name) {
//       await prisma.user.update({
//         where: { id: parseInt(Decodetoken?.id) },
//         data: {
//           name: name,
//         },
//       });
//     } else if (email) {
//       await prisma.user.update({
//         where: { id: parseInt(Decodetoken?.id) },
//         data: {
//           email: email,
//         },
//       });
//     } else if (phoneNumber) {
//       await prisma.user.update({
//         where: { id: parseInt(Decodetoken?.id) },
//         data: {
//           phoneNumber: phoneNumber,
//         },
//       });
//     } else {
//       await prisma.user.update({
//         where: { id: parseInt(Decodetoken?.id) },
//         data: {
//           name: name,
//           email: email,
//           phoneNumber: phoneNumber,
//         },
//       });
//     }
//   } catch (err) {
//     return res.status(500);
//   }
// };
// const UpdateProfile = async (req: Request, res: Response) => {
//   try {
//     const token: any = req.headers["authorization"]?.split(" ")[1];
//     const verify = verify_token_jwt(token);
//     if (!verify) {
//       return res.status(401).json({
//         status: "401",
//         message: "Invalid token",
//       });
//     }
//     const Decodetoken: any = jwt.decode(token);
//     const { name, bio, image } = req.body;
//     if (name) {
//       await prisma.profile.update({
//         where: { id: parseInt(Decodetoken.id) },
//         data: {
//           name: name,
//         },
//       });
//       return res.status(200).json({ messega: "Update name success" });
//     } else if (bio) {
//       await prisma.profile.update({
//         where: { id: parseInt(Decodetoken.id) },
//         data: {
//           bio: bio,
//         },
//       });
//       return res.status(200).json({ messega: "Update bio success" });
//     } else if (image) {
//       const bufferImage: any = Buffer.from(image, "base64");
//       await prisma.profile.update({
//         where: { id: parseInt(Decodetoken.id) },
//         data: {
//           image: bufferImage,
//         },
//       });
//       return res.status(200).json({ messega: "Update imagesuccess" });
//     } else {
//       await prisma.profile.update({
//         where: { id: parseInt(Decodetoken.id) },
//         data: {
//           name: name,
//           bio: bio,
//           image: image,
//         },
//       });
//       return res.status(200).json({ messega: "Update all profile success" });
//     }
//   } catch (err) {
//     return res.status(500).json({ message: "Error server", err });
//   }
// };
// const DeleteUser = (req: Request, res: Response) => {};
// export { GetUserData, UpdateUser, DeleteUser, UpdateProfile };
