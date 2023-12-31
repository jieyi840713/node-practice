$(function(){
  
    $("#drama-select-btn").click(function(){

        // [Coding]

        const type = $('#categories-select').val();
        console.log(type)
        // 建立 ajax 發request
        $.ajax({
            // url: `/dramas/list`, // 1. 沒帶type
            // url: `/dramas/list?type=abcd`, // 2. type 亂帶
            url: `/dramas/list?type=${type}`, // 3. 正常
            type: 'GET',
        })
            .then(res => {
                createTable(res.result)
            })
            .catch(err => {
            alert(err.responseJSON.message)
        })
    });

    $("#drama-insert-btn").click(function(){
        insertNewRecord();
    });

});

let createTable = (data)=>{
    data = data || [
        { category : "犯罪" , name : "絕命毒師" , score : 10 },
        { category : "殭屍" , name : "屍戰朝鮮" , score : 9 },
        { category : "愛情" , name : "想見你"   , score : 8.5 },
    ];
 

    let tableBody = data.map((ele,i)=>`
        <tr>
            <th scope="row">${i+1}</th>
            <td>${ele.category}</td>
            <td>${ele.name}</td>
            <td>${ele.score} / 10</td>
        </tr>
    `).join("");
    

    $("#drama-select-table tbody").html(tableBody);
};



let insertNewRecord = ()=> {
    let category  = $("#categories-insert option:selected").val(); 
    let name      = $("#name-insert").val();
    let score     = $("#score-insert").val();


    if(!name || name.length === 0){
        alert("請輸入劇名！");
        return;
    };

    if(!score || score.legnth === 0){
        alert("請輸入評價！");
        return;
    };


    $.ajax({
        url  : "/dramas/data",
        type: "POST",
        
        // 新增 headers key-value pair
        headers: {
            // 1. 沒帶token
            // 2. token帶錯
            // "x-mars-token":"ZZZ",
            // 3. 正常
            "x-mars-token":"APTX4869"
        },

        //// 以 application/x-www-form-urlencoded 資料傳送
        data : {
            category,
            name,
            score
        },
        ////
        
        //// 以 application/json 資料傳送
        // data : JSON.stringify({
        //     category,
        //     name,
        //     score
        // }),
        // contentType: "application/json",
        ////
    })
    .then(r=>{
        if(r.message === "ok."){
            alert("更新完成！");
            location.reload();
        };
        
    })
    .catch(err=>{
        console.log(err);
        alert(err.responseJSON.message)
        // if(err.status === 404){
        //     alert("找不到該 API !");
        //     return;
        // };
        
        // alert("系統有誤 , 請稍後再試！");
    });
};
