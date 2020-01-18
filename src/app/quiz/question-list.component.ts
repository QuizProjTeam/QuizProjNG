import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IQuiz } from './quiz';
import { Question } from './question';


@Component({
    selector: 'question-list',
    templateUrl: 'template/question-list.component.html',
    styleUrls: ['css/question-list.component.css']
})
export class QuestionListComponent {
    @Input() quiz: IQuiz;
    @Output() openEditQuestion = new EventEmitter();
    @Output() deleteQuestion = new EventEmitter();
    public loadPage(page: number) {
        console.log("current page number=" + page);

        //if (page !== this.previousPage) {
        //    this.previousPage = page;
        //    //this.loadData();
        //}
    }

    public mouseOver(msg: string) {
        var myMsg = `This question has ${msg} answers available`;
        console.log(myMsg);
    }

    public removeQuestion(idx) {
        this.deleteQuestion.emit(idx);
    }

    public openQuesitonMenu(question: Question) {
        //emit true so that the edit question area becomes visible
        this.openEditQuestion.emit(question);
        //this.modalIsOpen = true;

        //var modalInstance = $uibModal.open({
        //    animation: true,
        //    appendTo: $('#manage-quiz'),
        //    templateUrl: '/Content/templates/add-question-template.html',
        //    controller: 'AddQuestionController',
        //    controllerAs: 'ctrl',
        //    resolve: {
        //        items: question
        //    }
        //});

        //modalInstance.result.then(function (question) {
        //    if (question !== null) {
        //        $scope.quiz.questions.push(question);
        //    }
        //}, function () {
        //    console.log('Modal dismissed at: ' + new Date());
        //});

        //modalInstance.closed.then(function () {
        //    console.log('close');
        //    $scope.modalIsOpen = false;
        //});
    }
}