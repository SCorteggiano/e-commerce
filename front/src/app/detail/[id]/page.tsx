import { IProduct } from "@/interfaces";
import { Card } from "flowbite-react";
import Link from "next/link";
import AddToCart from "@/components/AddButton/AddButton";
import { Inter } from "next/font/google";
import ProductNotFound from "@/components/ProductNotFound/ProductNotFound";

export async function fetchProductById(id: string): Promise<IProduct> {
  const response = await fetch(`http://localhost:5000/products/${id}`);
  const product = await response.json();
  return product;
}

const inter = Inter({ subsets: ["latin"] });

async function Detail({ params }: { params: { id: string } }) {
  const product = await fetchProductById(params.id);

  return (
    <div>
      {product ? (
        <>
          <div className="absolute left-0 m-4 px-4 py-2 text-sm">
            <Link href={`/shop`}>
              <div className="rounded-lg  px-5 py-2.5 text-center text-sm font-medium text-white bg-blue-500 hover:bg-blue-700">
                {" "}
                BACK
              </div>
            </Link>
          </div>
          <div>
            <Card
              className="max-w-sm"
              imgAlt={product?.name || "image"}
              imgSrc={product?.image}
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {product?.name}
              </h5>
              <p
                className={`font-normal text-black dark:text-gray-400 ${inter.className}`}
              >
                {product?.description}
              </p>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ${product?.price}
              </span>
              <AddToCart id={product.id}></AddToCart>
            </Card>
          </div>
        </>
      ) : (
        <ProductNotFound />
      )}
    </div>
  );
}

export default Detail;
