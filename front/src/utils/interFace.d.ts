declare interface IModalWindow {
   isModalOpened: boolean,
   onModalClose?: () => void,
   id: string
}

// export interface IRoute {
//    path: string;
//    name: string;
//    exact: boolean;
//    component: any;
//    props?: any;
// }