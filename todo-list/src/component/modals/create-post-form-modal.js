import {Component} from "../../core/component.js";
import {Form} from "../../core/form.js";
import {Validator} from "../../core/validators.js";
import {Storage} from "../../core/storage.js";
import {pageApplication} from "../../main.js";

export class CreatePostFormModal extends Component {
    constructor(id) {
        super(id);
    }
    init() {
        this.component.addEventListener('click', onCloseModalHandler.bind(this))
        this.createPostForm = this.component.firstElementChild
        this.createPostForm.addEventListener('submit', onSubmitPostHandler.bind(this))
        this.formData = new Form(this.createPostForm,{
            title:[Validator.required],
            description:[Validator.required]
        })

    }
    onHide() {
        this.formData.clear()
    }
}
function onCloseModalHandler(e) {
    const{target} = e
    const isBg = target === this.component
    if (isBg){
        this.hide()
    }

}
function onSubmitPostHandler(e) {
    e.preventDefault()
    if (this.formData.isValid()) {
        const formData = {
            id: new Date().getTime(),
            ...this.formData.value(),
            status:'processing'
        }

        Storage.createPost(formData)
        this.hide()
        pageApplication.show()
    }
}