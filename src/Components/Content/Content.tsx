import React from "react";
import {ContentProps, ContentState} from "./ContentTypes";
import {IoGrid} from "react-icons/io5";
import {AiFillFileText} from "react-icons/ai";
import EditForm from "./EditForm";
import store from "../../store/store";
import {connect} from 'react-redux';
import {changeRows} from "../../store/rootReducer";

class Content extends React.Component<ContentProps, ContentState> {
    constructor (props: ContentProps) {
        super(props);
    }

    renderRows = () => {
        const {rows} = this.props;
        if (!rows || rows?.length === 0) {
            return <EditForm type="row" currentRow={null}/>
        } else {
            return (
                <>
                    {rows.map((item)=>{
                        return (
                            <div className="table-row table-grid" key={item.id}>
                                <div><AiFillFileText/></div>
                                <div>{item.title}</div>
                                <div>{item.type === "row" ? item.unit : ""}</div>
                                <div>{item.type === "row" ? item.quantity : ""}</div>
                                <div>{item.type === "row" ? item.unitPrice : ""}</div>
                                <div>{item.price}</div>
                            </div>
                        );
                    })}
                </>
            );
        }
    }

    render () {
        const data1 = {
            title: "первый",
            unit: "м3",
            quantity: 12,
            unitPrice: 13,
            price: 156,
        
            parent: null,
            type: 'row',
        }

        const data2 = {
            title: "второй",
            unit: "л",
            quantity: 2,
            unitPrice: 20,
            price: 40,
        
            parent: null,
            type: 'level',
        }


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
  