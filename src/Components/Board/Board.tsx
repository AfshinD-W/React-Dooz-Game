import { FC, useEffect, useState } from "react";
import Block from "../Block/Block";

interface IUserMoves {
    isMainUser: boolean,//true ? X : O
    value: number
}
type UsersType = Array<IUserMoves>


const Board: FC = () => {
    const [Users, setUsers] = useState<UsersType>([]);
    const [PresentUser, setPresentUser] = useState<boolean>(true);
    const [IsGameRestarting, setIsGameRestarting] = useState<string | undefined>(undefined);

    function AddUserMove(e: string) {
        setUsers(perv => [...perv, { isMainUser: PresentUser, value: parseInt(e) }]);
        setPresentUser(!PresentUser);
    }

    useEffect(() => {
        const WinsCases = ["1,2,3", "4,5,6", "7,8,9", "1,4,7", "2,5,8", "3,6,9", "1,5,9", "3,5,7"];
        let userMoves = Users.filter(p => p.isMainUser === !PresentUser).map(p => p.value);
        let WinCase = WinsCases.find((W) => userMoves.sort().toString().search(W) > -1);
        if (WinCase) {
            setUsers([]);
            setPresentUser(true)
            setIsGameRestarting(`User ${!PresentUser ? "One" : "Tow"} Won`);
            setTimeout(() => {
                setIsGameRestarting(undefined)
            }, 3000)
        }
    }, [Users, PresentUser]);


    function Renderblocks() {
        let arr = [];
        for (let i = 1; i < 10; i++) {
            arr.push(<Block PresentUser={PresentUser} onClickBlock={AddUserMove} number={i.toString()} />)
        }
        return arr
    }

    return (
        <div className="main">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                {!IsGameRestarting ? (
                    <>
                        <h2>{PresentUser ? "X" : "O"}</h2>
                        <div className="flex w-40 items-center justify-center flex-wrap mt-10">
                            {Renderblocks()}
                        </div>
                    </>
                ) : IsGameRestarting}
            </div>
        </div>
    )
}
export default Board