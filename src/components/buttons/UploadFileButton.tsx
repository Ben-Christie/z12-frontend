import classNames from "classnames";

interface Props {
  textColor?: string;
  bgColor?: string;
  hoverBgColor?: string;
  buttonWidth?: string;
  buttonHeight?: string;
  onFileSelect: (file: File) => void;
}

const UploadFileButton = ({textColor = 'text-white', bgColor = 'bg-black', hoverBgColor = 'hover:bg-orange-400', buttonWidth = 'w-1/4', buttonHeight = 'h-11', onFileSelect}: Props) => {
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      const allowedExtensions = /(\.jpg|\.png)$/i;
      if (allowedExtensions.exec(file.name)) {
        onFileSelect(file);
      } else {
        alert("Please select a valid image file with extension .jpg or .png");
      }
    }
  }

  return (
    <label className={classNames(
      "mx-auto",
      "my-auto",
      `${buttonWidth}`,
      `${buttonHeight}`,
      "text-lg",
      "font-bold",
      "rounded-lg",
      "transition-all",
      "duration-200",
      "ease-in-out",
      "transform",
      "hover:scale-110",
      `${bgColor}`,
      `${textColor}`,
      `${hoverBgColor}`
    )}>
      <input type="file" accept=".jpg,.png" className="hidden px-4 py-2" onChange={handleFileSelect} />
      <span className="absolute inset-0 flex items-center justify-center">
        Upload
      </span>
    </label>
  );
};

export default UploadFileButton;