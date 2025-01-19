const days=['s','m','t','w','t','f','s'];
//Filling days in calendar
const calendar=document.getElementById('calendar-box');
days.forEach((value)=>{
    const x=document.createElement('div');
    x.innerHTML=value;
    x.classList.add('calendar-days')
    calendar.appendChild(x);
})


//Todays date details
const Today=new Date();
function fill_calendar(Today){
const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
const current_day=Today.getDay();
const current_month=Today.getMonth();
const current_year=Today.getFullYear();
const current_month_firstDay=new Date(current_year,current_month).getDay()
const current_month_days=new Date(current_year,current_month+1,0).getDate();//nxt month ka 0th day

    // 1.Filling empty cells till month's 1st day start day
    for(let i=0;i<current_month_firstDay;i++){
        const x=document.createElement('div');
        calendar.appendChild(x);
    }
    //2.filling months dates
    for(let i=1;i<=current_month_days;i++){
        const x=document.createElement('div');
        if(i<10){
            x.innerHTML='0'+i;
        }
        else x.innerHTML=i;
        
        if(i===Today.getDate()){
            x.style.backgroundColor="blue";
            x.style.color="white";
            x.style.borderRadius="5px";
            x.style.padding="4px";

        }
        calendar.appendChild(x);
    }
    //calendar date click
    const calendar_click=document.getElementById('calendar-box')
    let date=Today.getDate();
    //display date
    const print_date=document.getElementById('left-head');
    print_date.textContent=`${date},${months[Today.getMonth()]} ${Today.getFullYear()}`
    // change date on clicking calendar
    calendar_click.addEventListener('click', (event) => {
      if (event.target.innerHTML >= 1 && event.target.innerHTML <= 31) {
        date = event.target.textContent;
        const print_date = document.getElementById('left-head');
        print_date.textContent = `${date},${months[Today.getMonth()]} ${Today.getFullYear()}`;
        
        // Update date key
        date = print_date.innerHTML;
    
        const task_container = document.getElementById('tasks');
        task_container.innerHTML = "";
    
        // If no tasks exist for the selected date, reset task_data[date] and counts
        if (!task_data[date]) {
          task_data[date] = [];
          task_status_count(task_data[date]); // Set counts to 0
        } else {
          // Display tasks for the selected date
          task_data[date].forEach((data) => {
            display_task(data);
          });
          task_status_count(task_data[date]); // Update counts
        }
      }
    });
    
    //calendar month display
    const display_month=document.querySelector('#calendar-month>h2');
    display_month.textContent=months[Today.getMonth()];
    
    
    
}
fill_calendar(Today);

                                      // ******************Task Management *******************************
//handeling form appearance
function form_appearance(){
  const add=document.getElementById('add_task');
const task_form=document.getElementById('task_form')
const close_form=document.querySelector('.close');
add.addEventListener('click',()=>{
  task_form.style.display="flex";
})
close_form.addEventListener('click',()=>{
    task_form.style.display="none";
})

}
form_appearance();

/* //object of array
12-11-24:{
    ["task1","task2"]
} */


//add task data

let date=document.getElementById('left-head').innerHTML;
const task_data={
    [date]:[],
}
function display_task(value){
    
    const taskdiv=document.createElement('div');
    const task_head=document.createElement('div');
    task_head.classList.add('task_class');
    task_head.innerHTML=`${value.title}`;
    const check=document.createElement('input');
    check.type="checkbox";
    check.checked=value.checked;
    taskdiv.appendChild(task_head);
    taskdiv.appendChild(check);
    if(check.checked){
        taskdiv.style.backgroundColor="gray";
      }
      else
      taskdiv.style.backgroundColor="beige";
    check.addEventListener('change',()=>{
        if(check.checked){
          taskdiv.style.backgroundColor="gray";
        }
        else
        taskdiv.style.backgroundColor="beige";
    value.checked=!value.checked;
    task_status_count(task_data[date]);
    })
    taskdiv.classList.add('task_container');
    const task_container=document.getElementById('tasks');
    task_container.appendChild(taskdiv);
}

//Adding new task
function add_task(){const submit=document.querySelector('.add');
  submit.addEventListener('click',(event)=>{
  event.preventDefault();
  const title=document.getElementById('task_title').value;
  
  const task={};
  task.title=title;
  task.checked=false;
  task_data[date].push(task);
  task_form.style.display="none";
  const task_container=document.getElementById('tasks');
  task_container.innerHTML="";
   
  task_data[date].forEach((data)=>{
    display_task(data);
        })
  //count_task
  task_status_count(task_data[date]);
 
  })}
add_task();


//function to count pending and completed task;
function task_status_count(Task_data){
  let pending=0;
  let completed=0;
  Task_data.forEach((value)=>{
    if(value.checked===true){
      completed++;
    }
    else pending++;
  })
  const completed_task=document.getElementById('completed_count');
  if(completed<10){
    completed_task.innerHTML='0'+completed;
  }
  else completed_task.innerHTML=completed;
  
  const pending_task=document.getElementById('pending_count');
  if(pending<10){
    pending_task.innerHTML='0'+pending;
  }
  else
  pending_task.innerHTML=pending;

}
task_status_count(task_data[date]);

//motivational quotes from Bhagvad Gita
const gitaQuotes = [
  "Focus on your duty, not on the results.",
  "Discipline leads to success.",
  "True knowledge dispels ignorance.",
  "Control your mind, or it will control you.",
  "Selfless action brings true growth.",
  "Peace comes from within, not from possessions.",
  "A calm mind is the key to wisdom.",
  "Your effort is your greatest asset.",
  "The soul is eternal, failures are temporary.",
  "Rise above distractions, stay committed.",
  "Humility and hard work lead to greatness.",
  "Learning is endless, keep seeking wisdom.",
  "Anger clouds judgment, stay composed.",
  "Success is a journey, not a destination.",
  "Detach from outcomes, focus on growth.",
  "Meditation sharpens your mind and focus.",
  "Strength comes from overcoming challenges.",
  "Find purpose in your actions, not rewards.",
  "Patience and perseverance yield results.",
  "Knowledge is the light that removes darkness."
]
function displayRandomQuote() {
  const index = Math.floor(Math.random() * gitaQuotes.length);
  const  quote_printer = document.querySelector('Header>h2');
  quote_printer.innerHTML=gitaQuotes[index];
}

setInterval(displayRandomQuote, 5000);

displayRandomQuote();

//sort button functionality
const sort_complete=document.getElementById('complete');
sort_complete.addEventListener('click',()=>{
  const not_done=task_data[date].filter((value)=>value.checked);
  const taskContainer = document.getElementById('tasks');
  taskContainer.innerHTML = "";
  not_done.forEach((data)=>{
    display_task(data);
  })
})

const sort_pending=document.getElementById('pending');
sort_pending.addEventListener('click',()=>{
  const not_done=task_data[date].filter((value)=>!value.checked);
  const taskContainer = document.getElementById('tasks');
  taskContainer.innerHTML = "";
  not_done.forEach((data)=>{
    display_task(data);
  })
})
const sort_all=document.getElementById('all');
sort_all.addEventListener('click',()=>{
  const taskContainer = document.getElementById('tasks');
  taskContainer.innerHTML = "";
  task_data[date].forEach((data)=>{
    display_task(data);
  })
})



