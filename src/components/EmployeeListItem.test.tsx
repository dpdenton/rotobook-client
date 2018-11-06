import * as  React from 'react';
import {shallow} from 'enzyme';
import EmployeeListItem from './EmployeeListItem';
import {Employee} from "../types";

describe('EmployeeListItem component', () => {

    it('should render a placeholder', () => {

        const props: Employee = {
            id: 1,
            name: 'David',
            email: 'david@rotageek.com',
            message: 'Hello World',
        };

        const wrapper = shallow(<EmployeeListItem{...props}/>);

        expect(wrapper.contains(
            <div className="employeeListItemName">{props.name}</div>)
        ).toEqual(true);
        expect(wrapper.contains(
            <div className="employeeListItemEmail">{props.email}</div>)
        ).toEqual(true);
        expect(wrapper.contains(
            <div className="employeeListItemMessage">{`"${props.message}"`}</div>)
        ).toEqual(true);
    });
});
