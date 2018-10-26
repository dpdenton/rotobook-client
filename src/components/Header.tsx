import * as React from 'react';
import {PagePaths} from "../types/enums";
import Tabs from "./Tabs";
import Tab from "./Tab";
import {Link} from "react-router-dom";

interface InputProps {
    title: string
    subTitle?: string
    path: string
}

const Header: React.SFC<InputProps> = ({title, subTitle, path}) => {

    return (
        <div>
            <h1>{title}</h1>
            {subTitle && <p>{subTitle}</p>}
            <Tabs>
                <Tab
                    active={path === PagePaths.EmployeeList}
                >
                    <Link to={PagePaths.EmployeeList}>View Employees</Link>
                </Tab>
                <Tab
                    active={path === PagePaths.EmployeeCreate}
                >
                    <Link to={PagePaths.EmployeeCreate}>Add Employee</Link>
                </Tab>
            </Tabs>
        </div>
    )
};

export default Header;