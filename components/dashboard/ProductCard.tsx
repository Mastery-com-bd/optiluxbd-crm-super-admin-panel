/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

const ProductCard = ({ product }: { product: any }) => {
  return (
    <div className="flex items-center justify-between gap-10 p-3 rounded-xl hover:bg-white/10 duration-500 relative">
      <div className="flex gap-4">
        <Image
          src={
            product.image ||
            "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png"
          }
          height={50}
          width={50}
          alt={product.name}
          className="w-16 h-16 rounded-xl"
        />
        <h1>{product?.name}</h1>
      </div>

      <div className="flex flex-col items-end gap-2">
        <p className="flex items-center gap-1 text-sm text-[#F2F2F2]">
          <span>TK</span>
          <span>{product?.price.toFixed(2)}</span>
        </p>
        <div
          className={`relative rounded-lg px-3 effect ${
            product?.status === "Active"
              ? "bg-[rgba(0,166,86,0.05)]"
              : "bg-[rgba(255,106,85,0.05)] "
          }`}
        >
          <span
            className={`text-xs ${
              product?.status === "Active" ? "text-success" : "text-[#F85E5E]"
            }`}
          >
            {product?.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
