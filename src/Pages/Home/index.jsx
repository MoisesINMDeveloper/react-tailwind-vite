import { useContext } from "react";
import Card from "../../Components/Card";
import ProductDetail from "../../Components/ProductDetail";
import Layout from "../../Components/Layout";
import { ShoppingContext } from "../../Context";

export default function Home() {
  const context = useContext(ShoppingContext);
  const renderView = () => {
    if (context.filteredItems?.length > 0) {
      return context.filteredItems?.length > 0 ? (
        context.filteredItems.map((item) => <Card key={item.id} data={item} />)
      ) : (
        <div className="flex justify-center col-span-4">
          <p>We don&apos;t have anything </p>
        </div>
      );
    }

    if (context.items?.length > 0) {
      return context.items.map((item) => <Card key={item.id} data={item} />);
    }
    // EN ESTE CONDICIONAL SE COLOCARA UN SKELETON LOADER
    return (
      <div className="flex justify-center col-span-4">
        <p>We don&apos;t have anything </p>
      </div>
    );
  };
  return (
    <Layout>
      <div className="w-80 relative flex items-center justify-center mb-4">
        <h1 className=" text-xl font-medium">Exclusive Products</h1>
      </div>
      <input
        className="border-black/50 w-80 focus:outline-none h-5 p-4 mb-4 border rounded-lg"
        onChange={(event) => context?.setSearchByTitle(event.target.value)}
        type="text"
        placeholder="Search a product"
      />
      <section className="sm:grid-cols-2 lg:grid-cols-3 grid w-full max-w-screen-lg grid-cols-1 gap-16 px-2">
        {renderView()}
      </section>
      <ProductDetail />
    </Layout>
  );
}
