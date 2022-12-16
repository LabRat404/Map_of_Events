import { useParams, BrowserRouter, Navigate, Route, Routes, useNavigate,Link, Outlet } from 'react-router-dom';

function EventDetails(props){
    let {vName} = useParams();
    return <div>{vName}</div>;
}
export default EventDetails;