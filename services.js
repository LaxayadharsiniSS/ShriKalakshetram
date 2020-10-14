(function(){
    'use script';
    angular.module("ServiceApp",[])
    .controller("ServiceController1",ServiceController1)
    .controller("ServiceController2",ServiceController2)
    .factory("CoursesFac", CoursesFac)
    .directive('info',info);
    var CourseList=[
        {CourseName:"Vocals", Ratings:"5"},
        {CourseName:"Bharathanatyam", Ratings: "4.9"},
        {CourseName:"Violin", Ratings:"4.3"},
        {CourseName:"Veena", Ratings:"4.7"},
        {CourseName:"Keyboard", Ratings:"4.8"}
    ];
    
    function info()
    {
        var ddo = { template:'  is a music academy that mainly focuses on developing students with pure appropriate course talent. The student will be able to achieve and participate in live contests related to their courses taken during their course of time'};
        return ddo; 
    }
    function CoursesFac()
    {
        var dispFunc = function(status)
        {
            return new Courses(status);
        };
        return dispFunc;
    }
    function Courses(status){
        var service=this;
        service.addCourse = function(CName, cRatings){
            if(status)
            { 
                var Course = {CourseName: CName, Ratings: cRatings};
                CourseList.push(Course);
            }
            else{
                throw new Error("Error: Only admin can add or remove courses");
            }
        };
        service.removeCourse = function(C_Index){
            if(status){
            CourseList.splice(C_Index,1);
            }
            else{
                throw new Error("Error: Only admin can remove courses");
            }
        };
        service.getList = function(){
            return CourseList;
        };    
    }
    ServiceController1.$inject = ['CoursesFac'];
    function ServiceController1(CoursesFac)
    {
        var C_Adder = this;
        var C_AdderFac = CoursesFac(0); // admin status = 1 who has rights to add courses 
        C_Adder.CName='';
        C_Adder.cRatings='';
        C_Adder.Add = function(){
            try{ 
                C_AdderFac.addCourse(C_Adder.CName,C_Adder.cRatings);}
            catch (error)
            {
                C_Adder.errorMessage = error.message;}
        }        
    }
    ServiceController2.$inject = ['CoursesFac'];
    function ServiceController2(CoursesFac)
    {
        var C_remove = this;
        var C_removeFac = CoursesFac(0);
        C_remove.Remove = function(C_Index){  
            try{
                C_removeFac.removeCourse(C_Index);
            } 
            catch (error)
            {
                C_remove.errorMessage = error.message;
            }
        };
        C_remove.show = C_removeFac.getList();
    }
})();
