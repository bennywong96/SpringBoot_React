
var Navbar = React.Component({
    render: function(){
        return( <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="index.html">AccountApp</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-item nav-link active" href="#">DashBoard <span className="sr-only">(current)</span></a>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Accounts
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Add Account</a>
                                <a className="dropdown-item" href="#">Get Account</a>

                            </div>
                        </li>
                    </div>
                </div>
            </nav>
        ) }
});


const App = React.createClass({

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


// class EmployeeList extends React.Component{
//     render() {
//         var employees = this.props.employees.map(employee =>
//             <Employee key={employee._links.self.href} employee={employee} onDelete={this.props.onDelete}/>
//         );
//         return (
//             <table>
//                 <tbody>
//                 <tr>
//                     <th>First Name</th>
//                     <th>Last Name</th>
//                     <th>Description</th>
//                 </tr>
//                 {employees}
//                 </tbody>
//             </table>
//         )
//     }
// }

var EmployeeTable = React.createClass({
    render: function() {
        const rows = [];
        this.props.employees.forEach(function(employee) {
            rows.push(<Employee employee={employee} />);
        });
        return (
            <div className="container">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Surname</th>
                        <th>Account Number</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>);
    }
});

var Employee = React.createClass({
    getInitialState: function() {
        return {display: true };
    },
    handleDelete() {
        var self = this;
        $.ajax({
            url: self.props.employee._links.self.href,
            type: 'DELETE',
            success: function(result) {
                self.setState({display: false});
            },
            error: function(xhr, ajaxOptions, thrownError) {
                toastr.error(xhr.responseJSON.message);
            }
        });
    },
    render: function() {
        if (this.state.display==false) return null;
        else return (
            <tr>
                <td>{this.props.employee.firstName}</td>
                <td>{this.props.employee.surname}</td>
                <td>{this.props.employee.accountNumber}</td>
                <td>
                    <button className="btn btn-info" onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>
        );
    }
});





// var EMPLOYEES = [
//     {firstName: 'Joe', surname: 'Biden', accountNumber: 5},
//     {firstName: 'President', surname: 'Biden', accountNumber: 8},
//     {firstName: 'Crystal', surname: 'Biden', accountNumber: 12},
//     {firstName: 'James', surname: 'Biden', accountNumber: 2}
// ];



// class CreateDialog extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//
//     handleSubmit(e) {
//         e.preventDefault();
//         var newEmployee = {};
//         this.props.attributes.forEach(attribute => {
//             newEmployee[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
//         });
//         this.props.onCreate(newEmployee);
//
//         // clear out the dialog's inputs
//         this.props.attributes.forEach(attribute => {
//             ReactDOM.findDOMNode(this.refs[attribute]).value = '';
//         });
//
//         // Navigate away from the dialog to hide it.
//         window.location = "#";
//     }
//
//     render() {
//         var inputs = this.props.attributes.map(attribute =>
//             <p key={attribute}>
//                 <input type="text" placeholder={attribute} ref={attribute} className="field" />
//             </p>
//         );
//
//         return (
//             <div>
//                 <a href="#createEmployee">Create</a>
//
//                 <div id="createEmployee" className="modalDialog">
//                     <div>
//                         <a href="#" title="Close" className="close">X</a>
//
//                         <h2>Create new employee</h2>
//
//                         <form>
//                             {inputs}
//                             <button onClick={this.handleSubmit}>Create</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
//
// }



ReactDOM.render( <App/>, document.getElementById('root') );