//
//  MapVC.swift
//  CourseMe
//
//  Created by danz on 12/18/17.
//  Copyright © 2017 openar. All rights reserved.
//

import UIKit
import MapKit
import CoreLocation

class MapVC: UIViewController, MKMapViewDelegate {

    
    @IBOutlet weak var filterSearch: UISearchBar!
    @IBOutlet weak var mapView: MKMapView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let mapDefaultlocation = CLLocation(latitude: 33.4200, longitude: -111.9350)
        centerMapOnLocation(location: mapDefaultlocation)
        mapView.delegate = self
    }
    
    func centerMapOnLocation(location: CLLocation) {
        let regionRadius: CLLocationDistance = 2000
        mapView.mapType = MKMapType.standard
        let coordinateRegion = MKCoordinateRegionMakeWithDistance(location.coordinate, regionRadius, regionRadius)
        mapView.setRegion(coordinateRegion, animated: true)
        
        var dummyPosts: [Post] = []
        let post1 = Post(title: "Free Food", postedDate: "16-Dec-2017",coordinate: CLLocationCoordinate2D(latitude: 33.4180, longitude: -111.9340))
        dummyPosts.append(post1)
        mapView.addAnnotation(post1)
        
        let post2 = Post(title: "Tutoring", postedDate: "16-Dec-2017",coordinate: CLLocationCoordinate2D(latitude: 33.4190, longitude: -111.9350))
        dummyPosts.append(post2)
        mapView.addAnnotation(post2)
        
        let post3 = Post(title: "Cats", postedDate: "16-Dec-2017",coordinate: CLLocationCoordinate2D(latitude: 33.4220, longitude: -111.9360))
        dummyPosts.append(post3)
        mapView.addAnnotation(post3)
        
        let post4 = Post(title: "Class at 2:00 with Bazzi", postedDate: "16-Dec-2017",coordinate: CLLocationCoordinate2D(latitude: 33.4200, longitude: -111.9370))
        dummyPosts.append(post4)
        mapView.addAnnotation(post4)
        
        let post5 = Post(title: "Printer", postedDate: "16-Dec-2017",coordinate: CLLocationCoordinate2D(latitude: 33.4210, longitude: -111.9330))
        dummyPosts.append(post5)
        mapView.addAnnotation(post5)

    }
    
    

    /*
    // MARK: - Navigation
    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}


extension MKMapView {
    
    func setZoomByDelta(delta: Double, animated: Bool) {
        var _region = region;
        var _span = region.span;
        _span.latitudeDelta *= delta;
        _span.longitudeDelta *= delta;
        _region.span = _span;
        
        setRegion(_region, animated: animated)
    }
}

extension ViewController: MKMapViewDelegate {
    func mapView(_ mapView: MKMapView, viewFor annotation: MKAnnotation) -> MKAnnotationView? {
        
        return nil;
}
}
