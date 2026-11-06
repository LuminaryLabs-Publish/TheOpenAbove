import * as THREE from "three";
export const CLOUD_COMBO_VISUAL_KIT_ID="open-above:visual:cloud-combo-clouds";
// Game-owned Three.js adapter. The Combo Domain supplies read-only zone descriptors.
export function createCloudComboVisualKit(scene,zones=[]){
  const count=zones.length*6;
  const geometry=new THREE.IcosahedronGeometry(1,1);
  const material=new THREE.MeshLambertMaterial({
    color:"#fdf4dc",transparent:true,opacity:.58,depthWrite:false
  });
  const mesh=new THREE.InstancedMesh(geometry,material,count);
  mesh.name="cloud-combo-lift-pockets";
  const dummy=new THREE.Object3D();let index=0;
  const color=new THREE.Color();
  for(const zone of zones){
    for(let lobe=0;lobe<6;lobe++){
      const angle=(lobe/6)*Math.PI*2,spread=80+(lobe%3)*35;
      dummy.position.set(zone.x+Math.cos(angle)*spread,
        zone.y+((lobe%3)-1)*22,zone.z+Math.sin(angle)*spread);
      dummy.scale.set(90+(lobe%2)*50,28+(lobe%3)*10,57+(lobe%3)*20);
      dummy.updateMatrix();mesh.setMatrixAt(index,dummy.matrix);
      color.set(lobe%3===0?"#ffe2ab":lobe%3===1?"#e5f4ec":"#bdeee3");
      mesh.setColorAt(index,color);
      index++;
    }
  }
  mesh.instanceMatrix.needsUpdate=true;
  if(mesh.instanceColor)mesh.instanceColor.needsUpdate=true;
  mesh.frustumCulled=false;scene.add(mesh);
  return Object.freeze({id:CLOUD_COMBO_VISUAL_KIT_ID,mesh,
    dispose(){scene.remove(mesh);geometry.dispose();material.dispose();}});
}
