from flask import request, jsonify

def add_data(db):
    data = request.json
    results = db.child("node").push(data)
    return jsonify(results), 201

def get_data(db):
    data = db.child("node").get()
    return jsonify(data.val()), 200

def update_data(db):
    data = request.json
    if 'id' not in data:
        return jsonify({"error": "ID is required"}), 400
    item_id = data['id']
    results = db.child("node").child(item_id).update(data)
    return jsonify(results), 200

def delete_data(db):
    item_id = request.args.get('id')
    if not item_id:
        return jsonify({"error": "ID is required for deletion"}), 400
    db.child("node").child(item_id).remove()
    return jsonify({"success": "Data deleted"}), 200
