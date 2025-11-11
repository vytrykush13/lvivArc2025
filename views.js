exports.main = (req, res) => {
	const Datastore = require('nedb');
	const db = new Datastore({ filename: 'lvivarc.json', autoload: true });
	db.find({ table: 'arctype' }, (err, docs) => {
		docs.sort((a, b) => {
			return a.id - b.id;
		});
		res.render(path + 'index2', { types: docs });
	});
};

exports.arcObject = (req, res) => {
	const objId = parseInt(req.params.id);
	const Datastore = require('nedb');
	const db = new Datastore({ filename: 'lvivarc.json', autoload: true });

	db.findOne({ table: 'arcobj', id: objId }, (err, doc) => {
		if (err) {
			console.log(err);
			return res.status(500).send('Database error');
		}
		if (!doc) {
			return res.status(404).send('Object not found');
		}

		db.findOne({ table: 'arctype', id: doc.type_id }, (err, typeDoc) => {
			if (err) {
				console.log(err);
				return res.status(500).send('Database error');
			}

			doc.type = typeDoc ? typeDoc.typeName : 'Unknown';

			res.render(path + '/object', { object: doc });
		});
	});
};

exports.listObjects = (req, res) => {
	tpId = parseInt(req.params.id);
	Datastore = require('nedb');
	db = new Datastore({ filename: 'lvivarc.json', autoload: true });
	db.find({ table: 'arcobj', type_id: tpId }, (err, docs) => {
		if (docs.length == 0) {
			res.sendFile(path + 'error404.html');
		} else {
			db.findOne({ table: 'arctype', id: tpId }, (err, doc) => {
				res.render(path + '/objects', { type: doc, objects: docs });
			});
		}
	});
};

exports.error404 = (req, res) => {
	res.sendFile(path + '404.html');
};
