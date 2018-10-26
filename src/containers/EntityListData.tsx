import * as React from 'react';
import {connect} from "react-redux";
import {Entities} from "../types/enums";

interface EntityListDataProps {
    entity: Entities
    data: any[]
    dataFunction: () => void
    children: (data: {data: any[]}) => React.ReactNode
}

class EntityListData extends React.Component<EntityListDataProps> {

    public componentDidMount() {
        this.props.dataFunction();
    }

    public render() {
        const {data}  = this.props;
        return this.props.children({data})
    }
}

const mapState = (state: any, props: any) => {

    const entity = state.entities[props.entity];
    console.log({entity})

    return {
        loading: entity.loading,
        data: entity.ids.map((id: number) => entity.byId[id])
    };
};

const mapDispatch =  (dispatch: any, props: any) => {
    return {
        dataFunction: () => dispatch(props.dataFunction()),
    }
};

export default connect(mapState, mapDispatch)(EntityListData);