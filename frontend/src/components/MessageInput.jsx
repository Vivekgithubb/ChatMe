import React, { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyBoardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

export default function MessageInput() {
  const { playRandomKey } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imgPreview, setImgPreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imgPreview && !text) return;
    if (isSoundEnabled) playRandomKey();
    sendMessage({
      text: text.trim(),
      image: imgPreview,
    });
    setImgPreview(null);
    setText("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImgPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImgPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  return (
    <div className="w-full p-2 bg-slate-700/60 min-h-[55px]">
      {imgPreview && (
        <div className="max-w-3xl mx-auto mb-3 flex items-center">
          <div className="relative">
            <img
              src={imgPreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-slate-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700"
              type="button"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full flex justify-between space-x-2"
      >
        <input
          type="text"
          placeholder="Type here"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            isSoundEnabled && playRandomKey();
          }}
          className="input input-bordered input-info flex-1 w-full "
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`bg-slate-800/50 text-slate-400 hover:text-slate-200 rounded-lg px-4 transition-colors ${
            imgPreview ? "text-cyan-500" : ""
          }`}
        >
          {" "}
          <ImageIcon className="w-5 h-5" />
        </button>
        <button
          type="submit"
          disabled={!text.trim() & !imgPreview}
          className="bg-blue-400 px-3 mx-1 flex justify-center items-center rounded-lg"
        >
          <SendIcon className="h-5 w-6" />
        </button>
      </form>
    </div>
  );
}
