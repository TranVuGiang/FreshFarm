import DefaultLayout from "./layouts/DefaultLayout";
import HomePages from "./pages/home";

export default function App() {
  return (
    <h1 className="">
      <DefaultLayout>
        <HomePages />
      </DefaultLayout>
    </h1>
  )
}