import React from "react";
import {ContentProps, ContentState} from "./ContentTypes";
import {AiFillFileText} from "react-icons/ai";
import EditForm from "./EditForm";
import {connect} from 'react-redux';

class Content extends React.Component<ContentProps, ContentState> {
    constructor (props: ContentProps) {
        super(props);

        this.state = {
            editMode: false,
            editedElement: null,
        }
    }

    componentDidMount = () => {
        if (!this.props.rows) {
            this.setState({editMode: true});
        }
    }

    renderRows = () => {
        const {rows} = this.props;
        const {editedElement} = this.state;

        if (rows) {
            return (
                <>
                    {rows.map((item)=>{
                        if (item.id !== editedElement) {
                            return (
                                <div className="table-row table-grid" key={item.id}>
                                    <div
                                        onClick={()=>{
                                            if (!editedElement) this.setState({editMode: true});
                                        }}
                                        style={{cursor: "pointer"}}
                                    >
                                        <AiFillFileText/>
                                    </div>
                                    <div
                                        onDoubleClick={(e)=>{
                                            if (!editedElement) this.setState({editedElement: item.id})
                                        }}
                                    >
                                        {item.title}
                                    </div>
                                    <div
                                        onDoubleClick={(e)=>{
                                            if (!editedElement) this.setState({editedElement: item.id})
                                        }}
                                    >
                                        {item.type === "row" ? item.unit : ""}
                                    </div>
                                    <div
                                        onDoubleClick={(e)=>{
                                            if (!editedElement) this.setState({editedElement: item.id})
                                        }}
                                    >
                                        {item.type === "row" ? item.quantity : ""}
                                    </div>
                                    <div
                                        onDoubleClick={(e)=>{
                                            if (!editedElement) this.setState({editedElement: item.id})
                                        }}
                                    >
                                        {item.type === "row" ? item.unitPrice : ""}
                                    </div>
                                    <div
                                        onDoubleClick={(e)=>{
                                            if (!editedElement) this.setState({editedElement: item.id})
                                        }}
                                    >
                                        {item.price}
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <EditForm
                                    type="row"
                                    currentRow={item}
                                    key={item.id}
                                    onFinish={()=>this.setState({editedElement: null})}
                                />
                            );
                        }
                    })}
                </>
            );
        }
    }

    render () {
        return (
            <div className="table">
                <div className="table-header table-grid">
                    <div>Уровень</div>
                    <div>Наименование работ</div>
                    <div>Ед. изм.</div>
                    <div>Количество</div>
                    <div>Цена за ед.</div>
                    <div>Стоимость</div>
                </div>
                
                {this.renderRows()}

                {this.state.editMode &&
                    <EditForm
                        type="row"
                        currentRow={null}
                        onFinish={()=>{
                            this.setState({editMode: false})
                        }}
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
      rows: state.rowsReducer.rows,
    };
  };
  
export default connect(mapStateToProps)(Content);
  