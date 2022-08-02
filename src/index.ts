import { port } from "../config/bootstrap";
import {App} from "./../config/App";
import { DBService } from "./service/DBService";
(function main(){
    (new DBService()).connect().then(()=>{
        console.log("Connected");
        App.listen(port,()=>{
            console.log("Application started at port",port);
        });
    }).catch(()=>{
        console.log("Some thing went wrong");
    });
})();