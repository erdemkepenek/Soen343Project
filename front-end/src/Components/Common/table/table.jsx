import React, {Component} from 'react';
import {Icon, Table, Input, Pagination, Dropdown, Button, Loader} from 'semantic-ui-react'
import './table.css';
import moment from "moment";
import _ from 'lodash';


let dataItems = [];
let indexOfLastTodo = 0;
let indexOfFirstTodo = 0;
let currentTodos = [];
let options = [];
let optionsValue = [];
let manupulate = false;
let arrayItems = [];
let itemNumber = 0;

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            search: true,
            direction: null,
            column: null,
            filterText: '',
            reset: false,
        };
        this.pageChange = this.pageChange.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.searchTrue = this.searchTrue.bind(this);
        this.searchFalse = this.searchFalse.bind(this);
        this.clickRow = this.clickRow.bind(this);
        this.handleOptions = this.handleOptions.bind(this);
        this.handleChangeDropdown = this.handleChangeDropdown.bind(this);
        this.resetFilterOptions = this.resetFilterOptions.bind(this);
        this.handleFilterSort = this.handleFilterSort.bind(this);
    }
    componentWillUnmount(){
        dataItems = [];
        indexOfLastTodo = 0;
        indexOfFirstTodo = 0;
        currentTodos = [];
        optionsValue = [];
        manupulate = false;
        arrayItems = [];
        itemNumber = 0;
    }
    componentDidMount() {
        dataItems = [];
        indexOfLastTodo = 0;
        indexOfFirstTodo = 0;
        currentTodos = [];
        optionsValue = [];
        manupulate = false;
        arrayItems = [];
        itemNumber = this.props.itemsPerPage;
        if(this.props.secondTable){
            dataItems = [];
            indexOfLastTodo = 0;
            indexOfFirstTodo = 0;
            currentTodos = [];
            optionsValue = [];
            manupulate = false;
            arrayItems = [];
            this.forceUpdate()
        }

    }


    pageChange(event, data) {
        this.setState({currentPage: data.activePage,});
        indexOfLastTodo = data.activePage * this.props.itemsPerPage;
        indexOfFirstTodo = indexOfLastTodo - this.props.itemsPerPage;
        currentTodos = dataItems.slice(indexOfFirstTodo, indexOfLastTodo);
    }

    handleUserInput(filterText) {
        if (optionsValue.length === 0) {
            this.setState({filterText: filterText.target.value});
            dataItems = [];
            if (filterText) {
                this.props.data.map((eachRow) => {
                    let includes = false;
                    let index = 0;
                    eachRow.map((eachColumn) => {
                        if (eachRow.length - 1 !== index) {
                            index = index + 1;
                            if ((eachColumn.value.toString().toLowerCase().includes(filterText.target.value.toString().toLowerCase()))) {
                                includes = true;
                            }
                        }
                    })
                    if (includes === true) {
                        dataItems.push(eachRow)
                    }
                })
                indexOfLastTodo = this.state.currentPage * this.props.itemsPerPage;
                indexOfFirstTodo = indexOfLastTodo - this.props.itemsPerPage;
                currentTodos = dataItems.slice(indexOfFirstTodo, indexOfLastTodo);
                this.setState({column: '', direction: null})
            }
        } else {
            if (filterText && !manupulate) {
                this.setState({filterText: filterText.target.value});
                dataItems = [];
                this.props.data.map((eachRow) => {
                    let includes = false;
                    let index = 0;
                    eachRow.map((eachColumn) => {
                        if (eachRow.length - 1 !== index) {
                            index = index + 1;
                            if ((eachColumn.value.toString().toLowerCase().includes(filterText.target.value.toString().toLowerCase()))) {
                                includes = true;
                            }
                        }
                    })
                    if (includes === true) {
                        dataItems.push(eachRow)
                    }
                })
                manupulate = true;
                this.handleFilterSort();
            } else {
                arrayItems = dataItems;
                dataItems = [];
                arrayItems.map((eachRow) => {
                    let includes = false;
                    let index = 0;
                    eachRow.map((eachColumn) => {
                        if (eachRow.length - 1 !== index) {
                            index = index + 1;
                            if ((eachColumn.value.toString().toLowerCase().includes(this.state.filterText.toString().toLowerCase()))) {
                                includes = true;
                            }
                        }
                    })
                    if (includes === true) {
                        dataItems.push(eachRow)
                    }
                })
                manupulate = false;
                indexOfLastTodo = this.state.currentPage * this.props.itemsPerPage;
                indexOfFirstTodo = indexOfLastTodo - this.props.itemsPerPage;
                currentTodos = dataItems.slice(indexOfFirstTodo, indexOfLastTodo);
                this.setState({column: '', direction: null})
            }
        }
    }

    handleOptions() {
        options = [];
        let index = 0;
        this.props.columnItems.map((columns) => {
            let optionColumn = [];
            let optionColumnIncludes = [];
            let includes = false;
            this.props.data.map((eachRow) => {
                let arrData = {
                    text: eachRow[index].value,
                    value: eachRow[index].value
                }
                if (!optionColumnIncludes.includes(eachRow[index].value.toString().toLowerCase())) {
                    optionColumnIncludes.push(eachRow[index].value.toString().toLowerCase());
                    optionColumn.push(arrData);
                }

            })
            options.push(optionColumn);
            index = index + 1;
        })
    }

    handleChangeDropdown(e, {value}, data) {
        let number = this.props.columnItems.indexOf(data);
        this.setState({reset: true})
        optionsValue[number] = value;
        this.handleFilterSort();
    }

    handleFilterSort() {
        if (manupulate) {
            arrayItems = dataItems;
            dataItems = [];
            let number = 0;
            optionsValue.map((data) => {
                number = number + 1
            })
            optionsValue.map((columns) => {
                arrayItems.map((rowData) => {
                    let x = 0;
                    optionsValue.map((rowColumns) => {
                        let index = optionsValue.indexOf(rowColumns);
                        if (rowData[index].value.toString().toLowerCase() === (rowColumns.toString().toLowerCase())) {
                            x = x + 1;
                        }
                    })
                    if (x === number && !dataItems.includes(rowData)) {
                        dataItems.push(rowData)
                    }
                })
            })

        } else {
            dataItems = [];
            let number = 0;
            optionsValue.map((data) => {
                number = number + 1
            })
            optionsValue.map((columns) => {
                this.props.data.map((rowData) => {
                    let x = 0;
                    optionsValue.map((rowColumns) => {
                        let index = optionsValue.indexOf(rowColumns);
                        if (rowData[index].value.toString().toLowerCase() === (rowColumns.toString().toLowerCase())) {
                            x = x + 1;
                        }
                    })
                    if (x === number && !dataItems.includes(rowData)) {
                        dataItems.push(rowData)
                    }
                })
            })
        }
        if (this.state.filterText && !manupulate) {
            manupulate = true
            this.handleUserInput();
        } else {
            manupulate = false;
            indexOfLastTodo = 1 * this.props.itemsPerPage;
            indexOfFirstTodo = indexOfLastTodo - this.props.itemsPerPage;
            currentTodos = dataItems.slice(indexOfFirstTodo, indexOfLastTodo);
            this.setState({column: '', direction: null, currentPage: 1})
        }
    }

    resetFilterOptions() {
        console.log(optionsValue)
        optionsValue = [];
        this.setState({reset: false, currentPage: 1, filterText: ''})
        dataItems = this.props.data;
        indexOfLastTodo = 1 * this.props.itemsPerPage;
        indexOfFirstTodo = indexOfLastTodo - this.props.itemsPerPage;
        currentTodos = dataItems.slice(indexOfFirstTodo, indexOfLastTodo);
    }

    handleSort = clickedColumn => () => {
        const {column, direction} = this.state
        let index = this.props.columnItems.indexOf(clickedColumn);
        if (column !== clickedColumn.value) {
            if ('text' === clickedColumn.type) {
                dataItems = _.sortBy(dataItems, [function (clickedColumn) {
                    return clickedColumn[index].value.toLowerCase();
                }]);
            } else if ('number' === clickedColumn.type) {
                dataItems = _.sortBy(dataItems, [function (clickedColumn) {
                    return parseInt(clickedColumn[index].value);
                }]);
            } else if ('date' === clickedColumn.type) {
                dataItems = _.sortBy(dataItems, [function (clickedColumn) {
                    return moment(clickedColumn[index].value).format();
                }]);
            }
            indexOfLastTodo = this.state.currentPage * this.props.itemsPerPage;
            indexOfFirstTodo = indexOfLastTodo - this.props.itemsPerPage;
            currentTodos = dataItems.slice(indexOfFirstTodo, indexOfLastTodo);
            this.setState({
                column: clickedColumn.value,
                direction: 'ascending',
            })
            return
        }
        dataItems = dataItems.reverse();
        indexOfLastTodo = this.state.currentPage * this.props.itemsPerPage;
        indexOfFirstTodo = indexOfLastTodo - this.props.itemsPerPage;
        currentTodos = dataItems.slice(indexOfFirstTodo, indexOfLastTodo);
        this.setState({direction: direction === 'ascending' ? 'descending' : 'ascending'})
    }

    searchTrue() {
        this.setState({search: true, currentPage: 1})
        indexOfLastTodo = 1 * this.props.itemsPerPage;
        indexOfFirstTodo = indexOfLastTodo - this.props.itemsPerPage;
        currentTodos = dataItems.slice(indexOfFirstTodo, indexOfLastTodo);
    }

    searchFalse() {
        this.setState({search: false, filterText: '', currentPage: 1,})
        dataItems = this.props.data;
        indexOfLastTodo = 1 * this.props.itemsPerPage;
        indexOfFirstTodo = indexOfLastTodo - this.props.itemsPerPage;
        currentTodos = dataItems.slice(indexOfFirstTodo, indexOfLastTodo);
    }

    clickRow(data) {
        this.props.clickRow(data);
    }

    render() {
        const {column, direction} = this.state;
        if(this.props.loading){
            return(
                <div className="table-Container">
                    <div className='table-Search-Container'>
                        <div className='table-Search-Bar'>
                            <Input type="text" placeholder="Type to Search..."/>
                        </div>
                    </div>
                    <Loader inverted active>Loading</Loader>
                </div>
            )
        }else if(this.props.data && this.props.columnItems && !this.props.errorMessage) {
            if (dataItems.length === 0 && !this.state.filterText && !this.state.reset) {
                dataItems = this.props.data;
                this.handleOptions();
                indexOfLastTodo = this.state.currentPage * this.props.itemsPerPage;
                indexOfFirstTodo = indexOfLastTodo - this.props.itemsPerPage;
                currentTodos = dataItems.slice(indexOfFirstTodo, indexOfLastTodo);
            }
            let filterColumnIndex = 0;
            return (
                <div className="table-Container">
                    <div className='table-Search-Container'>
                        <div className='table-Search-Bar'>
                            {this.state.search ?
                                <Input type="text" placeholder="Type to Search..." value={this.state.filterText}
                                       onChange={(e) => this.handleUserInput(e)}/> : ''}
                        </div>

                        <div className='table-Filter-Dropdown-Container'>
                            <div className='table-filter-title'>Add Filters</div>
                            <div className='table-filter-list'>
                                {this.props.columnItems.map((columnData) => {
                                    filterColumnIndex = filterColumnIndex + 1;
                                    let dropDownValue = optionsValue[filterColumnIndex - 1]
                                    return (
                                        <Dropdown inline
                                                  className='table-filter-list-item'
                                                  placeholder={columnData.value}
                                                  options={options[filterColumnIndex - 1]}
                                                  onChange={(e, {value}) => this.handleChangeDropdown(e, {value}, columnData)}
                                                  value={!this.state.reset ? '' : dropDownValue}/>
                                    );
                                })}
                                <Button position='right'
                                        content='Reset'
                                        basic
                                        onClick={this.resetFilterOptions}
                                />
                            </div>
                        </div>

                    </div>

                    <Table sortable celled fixed selectable singleLine className="common-Table">
                        <Table.Header>
                            <Table.Row>
                                {this.props.columnItems.map((columnData, key) => {
                                    return (
                                        <Table.HeaderCell
                                            key={key}
                                            sorted={column === columnData ? direction : null}
                                            onClick={this.handleSort(columnData)}>
                                            {columnData.render}
                                        </Table.HeaderCell>
                                    );
                                })}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {currentTodos.map((rowData, key) => {
                                let index = 0;
                                return (
                                    <Table.Row key={key} onClick={() => this.clickRow(rowData[rowData.length - 1])}>
                                        {rowData.map((eachColumn, key) => {
                                            if (rowData.length - 1 !== index) {
                                                index = index + 1;
                                                return (<Table.Cell key={key}>
                                                        {eachColumn.render}
                                                    </Table.Cell>
                                                );
                                            }
                                        })}
                                    </Table.Row>
                                );
                            })}

                        </Table.Body>
                        {this.props.footerContent ?
                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell/>
                                    <Table.HeaderCell/>
                                    <Table.HeaderCell/>
                                    <Table.HeaderCell/>
                                    <Table.HeaderCell/>
                                    <Table.HeaderCell
                                        className="centralize-tables">{this.props.footerContent}
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                            : ''}
                    </Table>

                    <Pagination totalPages={Math.ceil(dataItems.length / this.props.itemsPerPage)}
                                onPageChange={(e, data) => this.pageChange(e, data)}
                                ellipsisItem={{content: <Icon name='ellipsis horizontal'/>, icon: true}}
                                firstItem={{content: <Icon name='angle double left'/>, icon: true}}
                                lastItem={{content: <Icon name='angle double right'/>, icon: true}}
                                prevItem={{content: <Icon name='angle left'/>, icon: true}}
                                nextItem={{content: <Icon name='angle right'/>, icon: true}}
                                activePage={this.state.currentPage}
                                className="common-Pagination"
                    />

                </div>
            );
        }else{
            return(
                <div className="table-Container">
                    <div className='table-Search-Container'>
                        <div className='table-Search-Bar'>
                                <Input type="text" placeholder="Type to Search..."/>
                        </div>
                    </div>
                    <div className="common-Table" >
                        <div className='table-Error-Message'>
                        <span>{this.props.errorMessage}</span>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default (DataTable);