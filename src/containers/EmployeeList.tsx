import * as React from 'react';
import {Entities} from "../types/enums";
import EntityListData from "./EntityListData";
import {getEmployeeList} from "../actions/entities";
import EmployeeListItem from "../components/EmployeeListItem";

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