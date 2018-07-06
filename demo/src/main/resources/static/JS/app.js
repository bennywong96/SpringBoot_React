


var App = React.createClass({

    loadEmployeesFromServer: function () {
        var self = this;
        $.ajax({
            url: "http://localhost:8080/api/employees"
        }).then(function (data) {
            self.setState({employees: data._embedded.employees});
        });
    },

    getInitialState: function () {
        return {employees: []};
    },

    componentDidMount: function () {
        this.loadEmployeesFromServer();
    },

    render() {
        return ( <EmployeeTable employees={this.state.employees}/> );
    }
});

var Navbar = React.createClass({

    getAccounts() {
        ReactDOM.render(<App />, document.getElementById('root'))
    },

    addAccounts(){
        ReactDOM.render(<MyInput/>, document.getElementById('root'))
    },

    dashBoard(){
        ReactDOM.render(<Dash/>, document.getElementById('root'))
    },

    render: function(){
        return( <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#" onClick={this.dashBoard}>AccountApp</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-item nav-link active" href="#" onClick={this.dashBoard}>DashBoard <span className="sr-only">(current)</span></a>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Accounts
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#" onClick={this.addAccounts}>Add Account</a>
                                <a className="dropdown-item" href="#" onClick={this.getAccounts}>Get Account</a>

                            </div>
                        </li>
                    </div>
                </div>
            </nav>
        ) }
});

var NewUsers = React.createClass({

    render: function() {
        return (
            <div>
                <Navbar />
            </div>
        )
    },
});

var MyInput = React.createClass({
    getInitialState: function() {
        return {typed: ''};
    },
    firstNameChange: function(e) {
        this.setState({ firstName: e.target.value})
    },
    surnameChange: function(e) {
        this.setState({surname: e.target.value})
    },
    accountNumberChange: function(e) {
        this.setState({accountNumber: e.target.value})
    },

    onSubmit: function(e){
        e.preventDefault();

        const data = {
            "firstName": this.state.firstName,
            "surname": this.state.surname,
            "accountNumber": this.state.accountNumber
        };
        e.target.reset();
        const jsonData = JSON.stringify(data);

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "api/employees/add",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "3e28dcb4-ba6a-45bd-1807-4c74b1780b6f"
            },
            "processData": false,
            "data": jsonData
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            toastr.success("User Added!");
        });
    },
    render: function(){
        return(
            <div>
                <Navbar />
            <div className="container">

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="inputFirstName">First Name:</label>
                        <input type="text" className="form-control" id="inputFirstName" placeholder="First Name" onChange={this.firstNameChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputSurname">Last Name:</label>
                        <input type="text" className="form-control" id="inputSurname" placeholder="Last Name" onChange={this.surnameChange}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputAccountNumber"> Account Number:</label>
                        <input type="text" className="form-control" id="inputAccountNumber" placeholder="Account Number" onChange={this.accountNumberChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Account</button>
                </form>
            </div>
            </div>
        )
    }
});


var Dash = React.createClass({
    render: function () {
        return (
    <div>
        <Navbar/>
            <div className="container">
                <div>
                    <h1>Welcome</h1>
                    <p>Please use the navigation bar to go to different sections</p>
                </div>
            </div>
    </div>
        );
    }

});


//    var UsersForms = React.createClass({
//
//    });





var Employee = React.createClass({
    getInitialState: function() {
        return {display: true, editing: false };
    },
    handleDelete() {
        var self = this;
        $.ajax({
            url: self.props.employee._links.self.href,
            type: 'DELETE',
            success: function(result) {
                self.setState({delete: true});
                toastr.error("Deleted");
            },

            error: function(xhr, ajaxOptions, thrownError) {
                toastr.error("Error!!");
            }
        });
    },
    edit(){
        //ReactDOM.render(<CreateDialog/>, document.getElementById('root'))
        this.setState({
            editing: true
        });

    },

    save: function(){
        this.setState({
            editing: false
        });
        if(this.refs.newFirstName.value == false
            || this.refs.newSurname.value == false
            || this.refs.newAccountNumber.value == false){
            alert(jsonData.alert)
        }else {
            this.props.employee.firstName = this.refs.newFirstName.value;
            this.props.employee.surname = this.refs.newSurname.value;
            this.props.employee.accountNumber = this.refs.newAccountNumber.value;

            var self = this;
            $.ajax({
                url: self.props.employee._links.self.href,
                type: 'PUT',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(this.props.employee),
                success: function (result) {

                    //self.setState({display: false});
                    toastr.success("Updated User!");

                },
                error: function (xhr, ajaxOptions, thrownError) {
                    toastr.error(xhr.responseJSON.message);
                }
            });
        }
    },


    render: function() {
        if (this.state.delete) return null;
        else if(this.state.editing){
            return (
                <tr>
                    <td><input ref="newFirstName" defaultValue={this.props.employee.firstName}/></td>
                    <td> <input ref="newSurname" defaultValue={this.props.employee.surname}/></td>
                    <td> <input ref="newAccountNumber" defaultValue={this.props.employee.accountNumber}/></td>
                    <td>
                        <button className="btn btn-info" onClick={this.edit}>Edit</button>
                    </td>
                    <td>
                        <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
                    </td>

                    <td>
                        <button className="btn btn-success" onClick={this.save}>Save</button>
                    </td>
                </tr>
            )
        }
        else return (

                <tr>

                    <td>{this.props.employee.firstName}</td>
                    <td>{this.props.employee.surname}</td>
                    <td>{this.props.employee.accountNumber}</td>
                    <td>
                        <button className="btn btn-info" onClick={this.edit}>Edit</button>
                    </td>
                    <td>
                        <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
                    </td>

                </tr>);
    },

});

var EmployeeTable = React.createClass({
    render: function() {
        const rows = [];
        this.props.employees.forEach(function(employee) {
            rows.push(<Employee employee={employee} />);
        });
        return (
            <div>
                <Navbar/>
                <div className="container">

                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Surname</th>
                            <th>Account Number</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </table>
                </div>
            </div>);
    }
});




//
// var CreateDialog = React.createClass ({
//
//     // constructor(props) {
//     //     // noinspection JSAnnotator
//     //     super(props);
//     //     this.handleSubmit = this.handleSubmit.bind(this);
//     // },
//     getInitialState: function() {
//         return {typed: ''};
//     },
//     idEdit: function(e) {
//         this.setState({id: e.target.value})
//     },
//     firstNameEdit: function(e) {
//         this.setState({ firstName: e.target.value})
//     },
//     surnameEdit: function(e) {
//         this.setState({surname: e.target.value})
//     },
//     accountNumberEdit: function(e) {
//         this.setState({accountNumber: e.target.value})
//     },
//
//     onSubmit: function(e){
//         e.preventDefault();
//
//         const data = {
//             "firstName": this.state.firstName,
//             "surname": this.state.surname,
//             "accountNumber": this.state.accountNumber
//
//         };
//         e.target.reset();
//         const jsonData = JSON.stringify(data);
//
//         var settings = {
//             "async": true,
//             "crossDomain": true,
//             "url": "/api/employees/edit/"+this.props.employee.id,
//             "method": "PUT",
//             "headers": {
//                 "content-type": "application/json",
//                 "cache-control": "no-cache",
//                 "postman-token": "7e3a162c-b6b8-fefe-1056-7f7241d4e856"
//             },
//             "processData": false,
//             "data": jsonData
//         }
//
//         $.ajax(settings).done(function (response) {
//             console.log(response);
//             toastr.success("User Edited");
//         });
//         window.location = "#";
//
//
//         ReactDOM.render(<App />, document.getElementById('root'))
//     },
//
//
//     render: function() {
//         return (
//             <div>
//             <Navbar/>
//                     <div className="container">
//                         <h2>Edit Employee</h2>
//
//                         <form onSubmit={this.onSubmit}>
//                             <div className="form-group">
//                                 <label htmlFor="firstNameEdit">First Name:</label>
//                                 <input type="text" className="form-control" id="firstNameEdit" placeholder="First Name" onChange={this.firstNameEdit}/>
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="surnameEdit">Last Name:</label>
//                                 <input type="text" className="form-control" id="surnameEdit" placeholder="Last Name" onChange={this.surnameEdit}/>
//                             </div>
//
//                             <div className="form-group">
//                                 <label htmlFor="accountNumberEdit"> Account Number:</label>
//                                 <input type="text" className="form-control" id="accountNumberEdit" placeholder="Account Number" onChange={this.accountNumberEdit}/>
//                             </div>
//                             <button type="submit" className="btn btn-primary">Save</button>
//                         </form>
//                     </div>
//             </div>
//         )
//     }
//
// });



ReactDOM.render( <Dash />, document.getElementById('root') );