var conditions = [];
var p_values = [];

document.getElementById('json_input_file').addEventListener('change', function (e) {
    if (e.target.files[0]) {

        var file = document.getElementById("json_input_file").files[0];

        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            let all_networks = JSON.parse(evt.target.result);
            console.log(all_networks);
            process_data(all_networks);
            // clustering(all_networks);

            for (var i = 0; i < conditions.length; i++) {
                addCondition(conditions[i], "conditions");
            }

            for (var i = 0; i < p_values.length; i++) {
                addCondition(p_values[i], "p_values");
            }
        }
        reader.onerror = function (evt) {
            console.log("error reading file");
        }
    }
});




function process_data(allNetwork) {

    let checkedIfHuman = false;

    let nodes = allNetwork.nodes;
    let edges = allNetwork.edges;

    for (var i = 0; i < nodes.length; i++) {
        let node_data = nodes[i].data;
        let node_position = nodes[i].position;

        let node_data_id = node_data.id;

        if (node_position) {
            let node_data_uniprot = node_data.uniprot;
            // let node_data_log_ratio = node_data.log_ratio;
            let node_data_description = node_data.description;
            let node_data_displayName = node_data.displayName;
            let node_data_parent = node_data.parent;
            let node_data_codeBP = node_data.codeBP;

            getConditionsAndPValues(node_data);

            let node_position_x = node_position.x;
            let node_position_y = node_position.y;

            if (!checkedIfHuman) {
                if (node_data.tissue_skin) {
                    changeOrganism("human");
                } else {
                    changeOrganism("plant");
                }
                checkedIfHuman = true;
            }
        }
    }

    for (var i = 0; i < edges.length; i++) {
        let edge_data = edges[i].data;

        let edge_data_id = edge_data.id;
        let edge_data_source = edge_data.source;
        let edge_data_target = edge_data.target;
        let edge_data_stringdb_score = edge_data.stringdb_score;

    }
}

function clustering(allNetwork) {

    var clusters = {};
    let nodes = allNetwork.nodes;

    for (var i = 0; i < nodes.length; i++) {

        if (nodes[i].position) {

            let parent = nodes[i].data.parent;

            if (!(parent in clusters)) {
                clusters[parent] = [];
            }

            clusters[parent].push(nodes[i]);
        }
    }

}

function addCondition(condition, parent_id) {
    var option = document.createElement("option");
    option.value = condition;
    option.innerHTML = condition;

    var parentDiv = document.getElementById(parent_id);
    parentDiv.appendChild(option);
}

function getConditionsAndPValues(data) {
    for (key in data) {
        if (key.indexOf("p_value") !== -1) {
            if (!p_values.includes(key)) {
                p_values.push(key);
            }
        } else if (key.indexOf("condition") !== -1) {
            if (!conditions.includes(key)) {
                conditions.push(key);
            }
        }
    }
}


function filterByCondition() {
    var allConditions = document.getElementsByClassName("conditions_item");
    var allPValues = document.getElementsByClassName("p_values_item");

    for (var i = 0; i < allConditions.length; i++) {
        if (allConditions[i].checked) {

        }
    }
}

function changeOrganism(organism) {
    document.getElementById("organism").value = organism;

    var algo = document.getElementById("algorithm");
    algo.innerHTML = "";

    var option = document.createElement("option");
    option.value = "abundance_group_control";
    option.innerHTML = "abundance group control";
    algo.appendChild(option);

    if (organism == "human") {
        var option2 = document.createElement("option");
        option2.value = "skin_tissue";
        option2.innerHTML = "skin tissue";
        algo.appendChild(option2);
    }
}