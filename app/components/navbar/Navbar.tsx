import { SafeUser } from "@/app/types"
import Container from "../Container"
import Logo from "./Logo"
import SearchBar from "./SearchBar"
import UserMenu from "./UserMenu"

interface Navbarprops {
  currentUser?: SafeUser | null
}

const Navbar: React.FC<Navbarprops> = ({currentUser}) => {
  return (
    <div className="fixed w-full bg-white z-10">
      <div className="py-1 border-p-[1px]">
        <Container>
            <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
               <Logo/>
               <SearchBar/>
               <UserMenu currentUser={currentUser}/>
            </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar