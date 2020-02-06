const Joi= require('joi');
const express= require('express');
const app=express();
app.use(express.json());
const courses=[
    {id: 1,name: 'course1'},
    {id: 2,name: 'course2'},
    {id: 3,name: 'course3'}
];
// app.get('/',(req,res) =>{
//     res.send('REST Api');
// });
app.get('/api/courses',(req,res) =>{
    res.send(courses);
});

// app.get('/api/courses/:years/:months',(req,res) =>{
//     res.send(req.params);
// });

app.post('/api/courses',(req,res) =>{
    const {error}=validateCourse(req.body);

    if(error)
    {
        res.status(400).send(error.details[0].message);
        return;
    }
    const course= {
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


app.put('/api/courses/:id',(req,res) =>{
    
    const course=courses.find(c =>c.id===parseInt(req.params.id));
   if(!course) res.status(404).send('The course with the given Id not found');


const { error }=validateCourse(req.body);


if(error)
{
    res.status(400).send(error.details[0].message);
    return;
}
course.name=req.body.name;
res.send(course);

});

function validateCourse(course)
{
    const schema= {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course,schema);
}




app.delete('/api/courses/:id',(req,res) =>{

    const course=courses.find(c =>c.id===parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given Id not found');

    const index=courses.indexOf(course);
    courses.splice(index,1);
    res.send('Courses deleted');

 });



app.get('/api/courses/:id',(req,res) =>{
   const course=courses.find(c =>c.id===parseInt(req.params.id));
   if(!course) res.status(404).send('The course with the given Id not found');
   res.send(course);
});

app.listen(3000, () =>console.log('listening on port 3000...'));