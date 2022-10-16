import React from "react";
import {AiFillFileText} from "react-icons/ai";
import {EditFormProps, EditFormState} from "./ContentTypes";
import {connect} from 'react-redux';
import {changeRows} from "../../store/rootReducer";
import store from "../../store/store";
import { editRow, saveRow } from "../../MustHaveCode";

class EditForm extends React.Component<EditFormProps, EditFormState> {
    constructor(props: EditFormProps) {
        super(props);

        const item = props.currentRow;

        this.state = {
            title: item?.title ? item.title : null,
            unit: item?.unit ? item.unit : null,
            quantity: item?.quantity ? item.quantity : null,
            unitPrice: item?.unitPrice ? item.unitPrice : null,
        }
    }

    onSubmit = () => {
        const form = document.forms['editRow'];
        const data: any = {};
        const roundPrice = (x: number) => Math.round(x*100)/100;
        const {rows, currentRow} = this.props;

        data.title = form?.title?.value ? form.title.value : "Нет данных";
        data.unit = form?.unit?.value ? form.unit.value : "Нет данных";
        data.quantity = form?.quantity?.value ? roundPrice(form.quantity.value) : "Нет данных";
        data.unitPrice = form?.unitPrice?.value ? roundPrice(form.unitPrice.value) : "Нет данных";

        data.type = 'row';
        data.parent = null;
        if (currentRow) data.id = currentRow.id;

        if (isNaN(data.quantity*data.unitPrice)) {
            data.price = "Нет данных";
        } else {
            data.price = roundPrice(data.quantity*data.unitPrice);
        }

        const storage = rows ? [...rows] : [];

        currentRow ? editRow(data, storage) : saveRow(data, storage);

        store.dispatch(changeRows(storage));

        if (this.props.onFinish) this.props.onFinish();
    }

    render() {
        const {type} = this.props;
        const {unit, unitPrice, quantity, title} = this.state;

        return (
            <form className="table-grid table-row" name="editRow">
                <div><AiFillFileText/></div>
                <div>
                    <input
                        name="title"
                        onKeyDown={(e)=>{
                            if (e.key === 'Enter') this.onSubmit();
                        }}
                        defaultValue={title ? title : undefined}
                    />
                </div>
                <div>
                    {type === 'row' &&
                        <input
                            name="unit"
                            onKeyDown={(e)=>{
                                if (e.key === 'Enter') this.onSubmit();
                            }}
                            defaultValue={unit ? unit : undefined}
                        />
                    }
                </div>
                <div>
                    {type === 'row' &&
                        <input
                            name="quantity"
                            onKeyDown={(e)=>{
                                if (e.key === 'Enter') this.onSubmit();
                            }}
                            type="number"
                            defaultValue={quantity ? quantity : undefined}
                        />
                    }
                </div>
                <div>
                    {type === 'row' &&
                        <input
                            name="unitPrice"
                            onKeyDown={(e)=>{
                                if (e.key === 'Enter')  this.onSubmit();
                            }}
                            type="number"
                            defaultValue={unitPrice ? unitPrice : undefined}
                        />
                    }
                </div>
                <div/>
            </form>
        );
    }
}

const mapStateToProps = function(state) {
    return {
      rows: state.rowsReducer.rows,
    };
  };
  
export default connect(mapStateToProps)(EditForm);
