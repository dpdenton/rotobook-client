import * as React from 'react';
import {Entity} from "../types/enums";
import EntityListData from "../containers/EntityListData";
import {getEmployeeList} from "../actions/entities";
import EmployeeListItem from "./EmployeeListItem";
import {Employee} from "../types";


/*

I prefer passing props through children rather than via HOCs.
I think it's a bit clearer where the props are coming from

The EntityListData handles getting data from the specified entity (or from the data store if already exists).
I'd normally generalise the 'getEmployeeList' action to 'getEntity' or even 'getRequest' and pass an entity
config object which would have the entity's endpoint
 */


const EmployeeList: React.SFC<{}> = () => {

    return (
        <EntityListData
            entity={Entity.Employee}
            dataFunction={getEmployeeList}
        >
            {renderData}
        </EntityListData>
    )
};

const renderData = ({data}: { data: Employee[] }) => (

    data.map(employee => (
        <EmployeeListItem
            key={employee.id}
            {...employee}
        />
    ))
);

export default EmployeeList;