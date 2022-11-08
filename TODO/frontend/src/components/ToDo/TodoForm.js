import React from "react";


class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {project: props.projects[0].id, text: '', creator: this.props.users[0].id}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createToDo(this.state.project, this.state.text, this.state.creator)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="project">Project</label>

                    <select name="project" className='form-control' onChange={(event) => this.handleChange(event)}>
                        {this.props.projects.map((item) => <option value={item.id}>{item.name}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label for="text">Text</label>

                    <input type="text" className="form-control" name="text" value={this.state.text}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label for="creator">Creator</label>

                    <select name="creator" className='form-control' onChange={(event) => this.handleChange(event)}>
                        {this.props.users.map((item) => <option value={item.id}>{item.username}</option>)}
                    </select>
                </div>

                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default ToDoForm
