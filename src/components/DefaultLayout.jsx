
import { cn } from '../lib/utils';
import Header from './Header';


function AppLayOut() {


    return (
        <>
           <Header />
            <div className={cn("flex flex-col min-h-screen")}>
                <main className={cn("flex-1")}>
                    <p>Hello</p>
                </main>
                <footer className={cn("bg-gray-800 text-white p-4")}>
                    {/* Footer content goes here */}
                </footer>
            </div>
        </>
    )
}

export default AppLayOut;
