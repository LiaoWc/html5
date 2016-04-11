var sys_box2d = {}

game_sys_box2d = sys_box2d;

var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2World = Box2D.Dynamics.b2World,
// b2AABB = Box2D.Collision.b2AABB,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2Fixture = Box2D.Dynamics.b2Fixture,
    b2World = Box2D.Dynamics.b2World
//, b2MassData = Box2D.Collision.Shapes.b2MassData
    ,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
// b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
// b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef;
var world;

var PTM_RATIO = 32;
var debug_node;
var world_scale = 1;


var b2ContactFilter = Box2D.Dynamics.b2ContactFilter,
    b2ContactListener = Box2D.Dynamics.b2ContactListener;

// var body_def = new b2BodyDef;
// var fix_def = new b2FixtureDef;
sys_box2d.destroy_list = [];
sys_box2d.create_world = function () {
    var gravity = {x: 0, y: 0};
    var do_sleep = true;

    world = new b2World(new b2Vec2(gravity.x, gravity.y), do_sleep);
    world.SetContinuousPhysics(true);


    var listen = new b2ContactListener
    listen.BeginContact = function(contact) {
        var f1 = contact.GetFixtureA()
        var f2 = contact.GetFixtureB()


            var b1 = f1.GetBody();
            var b2 = f2.GetBody();

        var ud1 = b1.GetUserData();
        var ud2 = b2.GetUserData();

        if(ud1){

            if (ud1.type) {
                //console.log("milk")
                game_sys_notification.dispatch("ud1",ud1.type);
                //sys_box2d.destroy_body(b1);
                //return ;
            }
        }
        if(ud2){

            if (ud2.type) {
                //console.log("milk")
                game_sys_notification.dispatch("ud2",ud2.type);
                //sys_box2d.destroy_body(b1);
                //return ;
            }
        }
        //if(ud2){
        //    game_sys_notification.dispatch("ud2",ud1.type);
        //    //if (ud2.type != "ball") {
        //    //    //console.log("milk")
        //    //    sys_box2d.destroy_body(b2);
        //    //    return ;
        //    //}
        //}


        //if (b1.game_type == "banana") {
        //    if(b2.game_type == "man"){
        //        console.log("man get banana")
        //    }
        //    sys_box2d.destroy_body(b1, {t: "banana"});
        //    return ;
        //} else if (b2.game_type == "banana") {
        //    if(b1.game_type == "man"){
        //        console.log("man get banana")
        //    }
        //    sys_box2d.destroy_body(b2, {t: "banana"});
        //    return ;
        //}
    }
    //listen.EndContact = function(contact) {
    //    console.log("EndContact")
    //    //var f1 = contact.GetFixtureA()
    //    //var f2 = contact.GetFixtureB()
    //    //var other, car;
    //    //if (f1.GetBody().GetUserData() == "grass") {
    //    //    other = f1;
    //    //    car = f2;
    //    //} else if (f2.GetBody().GetUserData() == "grass") {
    //    //    other = f2;
    //    //    car = f1;
    //    //}
    //    //if(car){
    //    //    --car.GetBody().GetUserData().is_grass;
    //    //    if (car.GetBody().GetUserData().is_grass == 0) {
    //    //        car.GetBody().SetLinearDamping(1);
    //    //    }
    //    //}
    //}
    var filter = new b2ContactFilter;
    filter.ShouldCollide = function (f1, f2) {
        var b1 = f1.GetBody();
        var b2 = f2.GetBody();
        var ud1 = b1.GetUserData();
        var ud2 = b2.GetUserData();
        if(ud1){
            var str = ud1.type.substr(0,4)
            if (str == "milk" || str == "food") {
                //console.log("milk")
                sys_box2d.destroy_body(b1);
                return ;
            }
        }
        if(ud2){
            var str = ud2.type.substr(0,4)
            if (str == "milk" || str == "food") {
                //console.log("milk")
                sys_box2d.destroy_body(b2);
                return ;
            }
        }
        return true;
    }
    world.SetContactFilter(filter);
    //world.SetContactListener(listen);
    world.SetWarmStarting(true)
}

sys_box2d.create_body_def = function (args) {
    return new b2BodyDef;
}

sys_box2d.set_debug_node = function (node) {
    debug_node = node;
}

sys_box2d.get_static_type = function () {
    return b2Body.b2_staticBody;
}
sys_box2d.get_dynamic_type = function () {
    return b2Body.b2_dynamicBody;
}

sys_box2d.apply_force = function (body, radius, force) {
    body.ApplyForce(new b2Vec2(force * Math.sin(radius), force * Math.cos(radius)), body.GetWorldCenter());
}
sys_box2d.create_point = function (x, y) {
    //console.log(x,y)
    return new b2Vec2(x / PTM_RATIO, y / PTM_RATIO);
}

sys_box2d.create_fix_def = function () {
    return new b2FixtureDef;
}

sys_box2d.create_box_shape = function (width, height) {
    var shape = new b2PolygonShape;
    shape.SetAsBox(width / 2 / PTM_RATIO, height / 2 / PTM_RATIO);
    return shape;
}

sys_box2d.create_poly_shape = function (point_array) {
    var shape = new b2PolygonShape;
    var vec2_array = [];
    for (var i in point_array) {
        var point = point_array[i];
        vec2_array.push(new b2Vec2(point.x / PTM_RATIO, point.y / PTM_RATIO));
    }
    shape.SetAsArray(vec2_array, vec2_array.length)
    return shape;
}

sys_box2d.create_circle_shape = function (radius) {
    var shape = new b2CircleShape(radius / PTM_RATIO);

    return shape;
}

sys_box2d.set_scale = function (scale) {
    world_scale = scale
}
sys_box2d.add_object = function (bodyDef, fixDef) {
    var body = world.CreateBody(bodyDef);
    body.CreateFixture(fixDef);

    if (debug_node) {
        var draw_node = new cc.DrawNode();
        switch (body.m_fixtureList.m_shape.m_type) {
            case 0:

                draw_node.drawCircle(cc.p(0, 0), body.m_fixtureList.m_shape.m_radius * PTM_RATIO, 0, 20, true, 2, cc.color(0, 255, 0, 255));
                debug_node.addChild(draw_node, 5);
                break;
            case 1:
                var shape_data = [];
                for (var i in body.m_fixtureList.m_shape.m_vertices) {
                    var p = body.m_fixtureList.m_shape.m_vertices[i];
                    shape_data.push(cc.p(p.x * PTM_RATIO, p.y * PTM_RATIO));
                }
                //console.log(shape)
                draw_node.drawPoly(shape_data, null, 3, cc.color(0, 255, 0, 255));
                debug_node.addChild(draw_node, 5)
                break;
        }
        draw_node.x = body.GetPosition().x * PTM_RATIO;
        draw_node.y = body.GetPosition().y * PTM_RATIO;
        body.SetUserData(draw_node);
    }

    return body
}

sys_box2d.destroy_body = function (body, flag) {
    sys_box2d.destroy_list.push({b: body, f: flag});
}

sys_box2d.update = function (dt) {
    world.Step(dt, 10, 10);
    world.ClearForces();


    for (var b = world.GetBodyList(); b; b = b.GetNext()) {
        var user_data = b.GetUserData()
        if (user_data != null) {
            var node = user_data.node
            if(node){
                node.x = b.GetPosition().x * PTM_RATIO;
                node.y = b.GetPosition().y * PTM_RATIO;
                node.rotation = -1 * Math.deg(b.GetAngle());
            }
        }
    }

    for (var i in sys_box2d.destroy_list) {
        var body = sys_box2d.destroy_list[i].b;
        for (var f = body.GetFixtureList(); f; f = f.GetNext()) {
            body.DestroyFixture(f)
        }
        world.DestroyBody(body);
        var data = body.GetUserData();
        //if(data){
        //    var node = data.node
        //    if (node) {
        //        if (node.removeFromParentAndCleanup != null) {
        //            node.removeFromParentAndCleanup()
        //        }
        //    }
        //}
        game_sys_notification.dispatch("destroy_body", data)
    }
    if (sys_box2d.destroy_list.length != 0) {
        sys_box2d.destroy_list = [];
    }

};