import * as React from 'react';
import {Entities} from "../types/enums";
import EntityListData from "../containers/EntityListData";
import {getEmployeeList} from "../actions/entities";
import EmployeeListItem from "./EmployeeListItem";


/*

I prefer passing props through children rather than via HOCs.
I think it's a bit clearer where the props are coming from

The EntityListData handles getting data from the specified entity (or from the data store if already exists).
I'd normally generalise the 'getEmployeeList' action to 'getEntity' or even 'getRequest' and pass an entity
config object which would have the entity's endpoint
 */

const EmployeeList = () => {

    return (
        <EntityListData
            entity={Entities.Employee}
            dataFunction={getEmployeeList}
        >
            {({data}: any) => {
                {return data.map((employee: any) => {
                    return (
                        <EmployeeListItem
                            key={employee.id}
                            {...employee}
                        />
                    )
                })}

            }}
        </EntityListData>
    )
};

export default EmployeeList;