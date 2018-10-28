import * as React from 'react';
import {connect} from "react-redux";
import {Entities} from "../types/enums";
import {BarLoader} from 'react-spinners';
import {Employee} from "../types/models";


interface EntityListDataProps {
    entity: Entities
    loading: boolean
    data: Employee[] // \ Entity[]...
    dataFunction: () => void
    children: (data: {data: any[]}) => React.ReactNode
}

class EntityListData extends React.Component<EntityListDataProps> {

    public componentDidMount() {
        this.props.dataFunction();
    }

    public render() {
        const {data, loading}  = this.props;

        if (loading) {
            return <BarLoader
                width={100}
                widthUnit={'%'}
                color={'#f20f2d'}
                className={'barLoader'}
            />
        }

        return this.props.children({data})
    }
}

const mapState = (state: any, props: any) => {

    const entity = state.entities[props.entity];

    return {
        loading: entity.loading,
        data: entity.ids.map((id: number) => entity.byId[id])
    };
};

const mapDispatch =  (dispatch: any, props: any) => (
    dispatch(props.dataFunction())
);

export default connect(mapState, mapDispatch)(EntityListData);