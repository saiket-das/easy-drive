import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, Form } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type FileType = UploadFile;

const getBase64 = (file: FileType["originFileObj"]): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    } else {
      reject("No file provided");
    }
  });

type AppFileUploadProps = {
  name: string;
  label?: string;
  maxFiles?: number;
};

const AppFileUpload = ({ name, label, maxFiles = 8 }: AppFileUploadProps) => {
  const { control } = useFormContext();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Form.Item label={label}>
              <Upload
                {...field}
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={(info) => {
                  const files = info.fileList.map((file) => file.originFileObj);
                  field.onChange(files);
                  handleChange(info);
                }}
              >
                {fileList.length >= maxFiles ? null : uploadButton}
              </Upload>
              {error && <small style={{ color: "red" }}>{error.message}</small>}
            </Form.Item>
            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </>
        )}
      />
    </div>
  );
};

export default AppFileUpload;

// import { useState } from "react";
// import { PlusOutlined } from "@ant-design/icons";
// import { Image, Upload, Form } from "antd";
// import type { UploadFile, UploadProps } from "antd";
// import { Controller, useFormContext } from "react-hook-form";

// type FileType = UploadFile;

// const getBase64 = (file: FileType["originFileObj"]): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     if (file) {
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = (error) => reject(error);
//     } else {
//       reject("No file provided");
//     }
//   });

// type AppFileUploadProps = {
//   name: string;
//   label?: string;
//   maxFiles?: number;
// };

// const AppFileUpload = ({ name, label, maxFiles = 8 }: AppFileUploadProps) => {
//   const { control } = useFormContext();
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [fileList, setFileList] = useState<UploadFile[]>([]);

//   const handlePreview = async (file: UploadFile) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }
//     setPreviewImage(file.url || (file.preview as string));
//     setPreviewOpen(true);
//   };

//   const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
//     setFileList(newFileList);

//   const uploadButton = (
//     <div>
//       <PlusOutlined />
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </div>
//   );

//   return (
//     <div style={{ marginBottom: "20px" }}>
//       <Controller
//         name={name}
//         control={control}
//         render={({ field, fieldState: { error } }) => (
//           <>
//             <Form.Item label={label}>
//               <Upload
//                 {...field}
//                 action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
//                 listType="picture-card"
//                 fileList={fileList}
//                 onPreview={handlePreview}
//                 onChange={(info) => {
//                   const file = info.fileList?.[0]?.originFileObj;
//                   if (file) {
//                     field.onChange(file); // Pass the file to the parent form
//                   }
//                   handleChange(info); // Handle the fileList update
//                 }}
//               >
//                 {fileList.length >= maxFiles ? null : uploadButton}
//               </Upload>
//               {error && <small style={{ color: "red" }}>{error.message}</small>}
//             </Form.Item>
//             {previewImage && (
//               <Image
//                 wrapperStyle={{ display: "none" }}
//                 preview={{
//                   visible: previewOpen,
//                   onVisibleChange: (visible) => setPreviewOpen(visible),
//                   afterOpenChange: (visible) => !visible && setPreviewImage(""),
//                 }}
//                 src={previewImage}
//               />
//             )}
//           </>
//         )}
//       />
//     </div>
//   );
// };

// export default AppFileUpload;
