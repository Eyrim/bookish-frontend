window.onload = () => {
    document.getElementById("submitMemberButton")
        .addEventListener("mouseup", (event) => {
            let memberName = document.getElementById("member-name-entry").value;
            
            fetch("http://localhost:8080/member/new/" + memberName, {
                method: "POST",
                headers: {
                    "Access-Control-Allow-Origin": '*'
                }
            })
            .then((response) => console.log(response));
        });
};