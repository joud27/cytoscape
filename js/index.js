document.getElementById('json_input_file').addEventListener('change', function (e) {
    if (e.target.files[0]) {

        var file = document.getElementById("json_input_file").files[0];

        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            let all_networks = JSON.parse(evt.target.result);

            process_data(all_networks);
        }
        reader.onerror = function (evt) {
            console.log("error reading file");
        }
    }
});


function process_data(allNetwork) {

    let nodes = allNetwork.nodes;
    let edges = allNetwork.edges;

    for (var i = 0; i < nodes.length; i++) {
        let node_data = nodes[i].data;

        let node_data_id = node_data.id;

        if (nodes[i].position) {
            let node_data_uniprot = node_data.uniprot;
            let node_data_log_ratio = node_data.log_ratio;
            let node_data_description = node_data.description;
            let node_data_displayName = node_data.displayName;
            let node_data_parent = node_data.parent;
            let node_data_codeBP = node_data.codeBP;

            let node_position = nodes[i].position;
            let node_position_x = node_position.x;
            let node_position_y = node_position.y;


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