import { store } from "@graphprotocol/graph-ts"
import {
  SBT as SBTContract,
  Attest,
  Revoke
} from "../generated/SBT/SBT"
import { SBT } from "../generated/schema";

export function handleAttest(event: Attest): void {
  let entity = SBT.load(event.params.tokenId.toHexString());
  if (!entity) {
    entity = new SBT(event.params.tokenId.toHexString());
  }

  entity.owner = event.params.to;
  entity.tokenId = event.params.tokenId;
  let SbtInstance = SBTContract.bind(event.address);
  entity.tokenURI = SbtInstance.tokenURI(event.params.tokenId);

  entity.save()

}

export function handleRevoke(event: Revoke): void {
  let entity = SBT.load(event.params.tokenId.toHexString());
  if (!entity) {
    store.remove('SBT', event.params.tokenId.toHexString());
  }

}
